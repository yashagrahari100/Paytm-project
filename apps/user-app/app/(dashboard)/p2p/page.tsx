import { OnRampTransfer } from "../../../components/OnRampTransfer";
import { SendCard } from "../../../components/SendCard";
import { prisma } from '@repo/db/client'
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";

async function getOnRampTransfer() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        },
        include:{
            toUser: {
                select: {
                    name: true
                }
            }
        }
    });
    return txns.map(t => ({
        time: t.timestamp,
        amount: t.amount,
        to:t.toUser.name ?? "Unkown User"
    }))
}

export default async function() {
    const transactions = await getOnRampTransfer();

    return (
    <div className="grid grid-cols-2 w-full">
        <SendCard />
        <OnRampTransfer transactions={transactions}/>
       
    </div>
    )
}