import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Header from "~/components/Header";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (

    <SessionProvider session={session}>
      <div className='bg-gradient-to-b from-gray-900 to-gray-600 min-h-screen min-w-screen'>
        <Header />
        <div className="container mx-auto py-6 px-4 sm:px-8 max-w-7xl">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider >
  );
};

export default api.withTRPC(MyApp);
