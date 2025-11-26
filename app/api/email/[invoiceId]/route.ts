import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.co",
      name: "Anu",
    };
    emailClient.send({
      from: sender,
      to: [{ email: "shoyodeksodiq@gmail.com" }],

      template_uuid: "09fd713a-bdc4-4ed0-a511-ae4faade664b",
      template_variables: {
        company_info_name: "Invoice Marshal",
        first_name: invoiceData.clientName,
        company_info_address: "Chad 1234",
        company_info_city: "Lagos",
        company_info_zip_code: "342121",
        company_info_country: "Nigeria",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email reminder" });
  }
}
