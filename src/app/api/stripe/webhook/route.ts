import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = Stripe.webhooks.constructEvent(body, sig!, endpointSecret);
  } catch (error) {
    return NextResponse.json({ error: `Webhook Error` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentIntentId = session.payment_intent as string;

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      await prisma.donation.update({
        where: { id: paymentIntent.metadata.donationId },
        data: {
          status: "PAID",
        },
      });

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
