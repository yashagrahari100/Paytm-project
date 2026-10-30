
import { Card } from "@repo/ui/card";

interface OnRampTransfer {
    time: Date;
    amount: number;
    to: string;
    
}

interface OnRampTransferProps {
    transactions: OnRampTransfer[];
}

export const OnRampTransfer= ({transactions}:OnRampTransferProps)=>{
    if (transactions.length === 0 ) {
        return (
            <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            </Card>
        );
    }

  return (

     <Card title="Recent Transactions">
            <div className="pt-2">
                {transactions.map((t, index) => (
                    <div
                        key={`${t.time.getTime()}-${index}`}
                        className="flex justify-between"
                    >
                        <div>
                            <div className="text-sm">
                                Send INR to {t.to}
                            </div>

                            <div className="text-slate-600 text-xs">
                                {t.time.toDateString()}
                            </div>
                        </div>

                        <div className="flex flex-col justify-center">
                            + Rs {t.amount / 100}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
  )
}








