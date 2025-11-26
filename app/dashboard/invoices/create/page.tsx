import { CreateInvoice } from "@/app/components/CreateInvoice";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";

async function getUserDate(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });
  return data;
}
export default async function InvoiceCreationRoute() {
  const session = await requireUser();
  const data = await getUserDate(session.user?.id as string);
  return (
    <CreateInvoice
      lastName={data?.lastName as string}
      firstName={data?.firstName as string}
      email={data?.email as string}
      address={data?.address as string}
    />
  );
}
