import { Users, DollarSign, Wallet } from "lucide-react";
import { StatCard } from "./stats-card";
import { getStatsCreator } from "../_data-access/get-stats-creator";
import { formatCurrency } from "@/utils/format";

interface StatsProps {
  userId: string;
  stripeAccountId: string;
}

export async function Stats({ stripeAccountId, userId }: StatsProps) {
  const { data } = await getStatsCreator(userId, stripeAccountId);

  if (!data) {
    return null;
  }

  const { totalDonations, totalAmountDonated, balance } = data;

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
      <StatCard
        title="Apoiadores"
        description="Total de apoiadores"
        icon={<Users className="w-8 h-8 text-blue-400" />}
        value={totalDonations}
      />

      <StatCard
        title="Total recebido"
        description="Quantidade total recebida"
        icon={<DollarSign className="w-8 h-8 text-amber-500" />}
        value={formatCurrency(totalAmountDonated)}
      />

      <StatCard
        title="Saldo em conta"
        description="Saldo pendente"
        icon={<Wallet className="w-8 h-8 text-green-500" />}
        value={formatCurrency(balance)}
      />
    </div>
  );
}
