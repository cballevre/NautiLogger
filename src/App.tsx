import { Refine } from "@refinedev/core";
import { dataProvider } from "@refinedev/supabase";

import { supabaseClient } from "./utils/supabaseClient";
import { ShowBoat } from "./pages/boats/show";

function App() {

  return (
    <Refine
      dataProvider={dataProvider(supabaseClient)}>
      <ShowBoat />
    </Refine>
  )
}

export default App
