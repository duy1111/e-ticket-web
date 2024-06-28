import { CreditCard, DollarSign, Package } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { formatter } from "@/lib/utils";
import { auth } from "@/auth";
import { logout } from "@/actions/logout";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
};

const DashboardPage: React.FC<DashboardPageProps> = async ({ 
  params
}) => {
    const session = await auth()

  const totalRevenueReq = await fetch(process.env.BACKEND_URL + 'getTotalRevenue', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
    },
  })


  const graphRevenueReq = await fetch(process.env.BACKEND_URL + 'getGraphRevenue', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
    },
  })

  const salesCountReq = await fetch(process.env.BACKEND_URL + 'getSalesCount', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
    },
  })

  if(!totalRevenueReq.ok || !graphRevenueReq.ok || !salesCountReq.ok) {
    return <div>fail</div>
  }

    const totalRevenue = await totalRevenueReq.json()
    const graphRevenue = await graphRevenueReq.json()
    const salesCount = await salesCountReq.json()

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your analytic" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
