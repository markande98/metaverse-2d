import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SigninForm } from "./signin-form";
import { SignupForm } from "./signup-form";

const AuthForms = () => {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-gray-50">
      <div className="flex justify-between items-center gap-x-4">
        <img src="/images/zep.png" alt="Logo" className="h-20 w-20 rounded" />
        <p className="font-extrabold text-6xl text-blue-600">ZEP</p>
      </div>
      <Card className="w-full max-w-md">
        <Tabs defaultValue="signin" className="w-full">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="signin">
              <SigninForm />
            </TabsContent>

            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthForms;
