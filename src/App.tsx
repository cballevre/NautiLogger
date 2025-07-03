import { Refine, Authenticated } from "@refinedev/core";
import { dataProvider } from "@refinedev/supabase";

import { supabaseClient } from "./utils/supabaseClient";
import { authProvider } from "./providers/auth-provider.ts";
import { ShowBoat } from "./pages/boats/show";

function App() {

  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}
      authProvider={authProvider}>
      <Authenticated key="protected" fallback={<div>Not authenticated</div>}>
        <ShowBoat />
      </Authenticated>
    </Refine>
  )
}

export default App
