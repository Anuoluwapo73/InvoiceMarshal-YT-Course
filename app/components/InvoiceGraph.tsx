import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Graph from "./Graph";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";

async function getInvoices(userId: string): Promise<{ date: string; amount: number }[]> {
  const rawData = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      userId: userId,
      date: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      date: true,
      total: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  //Group and aggregate data by date
  const aggregateData = rawData.reduce(
    (
      acc: { [key: string]: number },
      curr: { date: Date; total: number }
    ) => {
      const date = new Date(curr.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      acc[date] = (acc[date] || 0) + curr.total;
      return acc;
    },
    {}
  );

  //convert to array and format object
  const transformData: { date: string; amount: number }[] = Object.entries(aggregateData)
    .map(([date, amount]) => ({
      date,
      amount: Number(amount),
      originalDate: new Date(date + ", " + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount,
    }));
  return transformData;
}
export async function InvoiceGraph() {
  const session = await requireUser();
  const data = await getInvoices(session.user?.id as string);

  console.log("InvoiceGraph - User ID:", session.user?.id);
  console.log("InvoiceGraph - Data:", data);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          Invoices which have been paid in the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            No paid invoices in the last 30 days
          </div>
        ) : (
          <Graph data={data} />
        )}
      </CardContent>
    </Card>
  );
}
