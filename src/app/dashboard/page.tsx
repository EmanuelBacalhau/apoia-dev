import { DonationTable } from "./_components/donates";
import { Stats } from "./_components/analytics";
import { getOnboardAccount } from "./_data-access/get-onboard-account";
import { auth } from "@/lib/auth";
import { CreateAccountButton } from "./_components/create-account-button";
import { getDonations } from "./_data-access/get-donations";
import { getStripeDashboard } from "./_data-access/get-stripe-dashboard";

export default async function Dashboard() {
  const session = await auth();

  const loginLink = await getStripeDashboard(
    session?.user.connectedStripeAccountId!
  );

  const result = await getDonations(session?.user.id!);

  return (
    <div className="p-4">
      <section className="flex items-center justify-between mb-4">
        <div className="w-full flex items-center gap-2 justify-between">
          <h1 className="text-2xl font-semibold">Minha conta</h1>
          {!loginLink.url ? (
            <CreateAccountButton />
          ) : (
            <a
              href={loginLink.url}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              target="_blank"
            >
              Ajustar conta Stripe
            </a>
          )}
        </div>
      </section>

      {!session?.user.connectedStripeAccountId && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
          <p>
            Você ainda não possui uma conta Stripe conectada. Por favor, crie
            uma para começar a receber doações.
          </p>
        </div>
      )}

      {session?.user.connectedStripeAccountId && (
        <div className="mb-4">
          <Stats
            stripeAccountId={session?.user.connectedStripeAccountId!}
            userId={session?.user.id!}
          />

          <h2 className="text-2xl font-semibold mb-2">Últimas doações</h2>
          {result.success && !result.error && (
            <DonationTable donations={result.data!} />
          )}
        </div>
      )}
    </div>
  );
}
