import { DonationTable } from "./_components/donates";
import { Stats } from "./_components/analytics";
import { getOnboardAccount } from "./_data-access/get-onboard-account";
import { auth } from "@/lib/auth";
import { CreateAccountButton } from "./_components/create-account-button";
import { getDonations } from "./_data-access/get-donations";

export default async function Dashboard() {
  const session = await auth();

  const { url } = await getOnboardAccount(
    session?.user.connectedStripeAccountId ?? null
  );

  const result = await getDonations(session?.user.id!);

  return (
    <div className="p-4">
      <section className="flex items-center justify-between mb-4">
        <div className="w-full flex items-center gap-2 justify-between">
          <h1 className="text-2xl font-semibold">Minha conta</h1>
          {!session?.user.connectedStripeAccountId ? (
            <CreateAccountButton />
          ) : (
            <a
              href={url}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Ajustar conta Stripe
            </a>
          )}
        </div>
      </section>

      <Stats
        stripeAccountId={session?.user.connectedStripeAccountId!}
        userId={session?.user.id!}
      />

      <h2 className="text-2xl font-semibold mb-2">Últimas doações</h2>
      {result.success && !result.error && (
        <DonationTable donations={result.data!} />
      )}
    </div>
  );
}
