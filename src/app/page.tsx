import { Box, Chip, Typography } from "@mui/material";
import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth/auth";
import { trpc } from "@/server/trpc/server";

export default async function HomePage() {
  const hello = await trpc.greeting.hello();
  const session = await getServerSession(authOptions);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 3,
      }}
    >
      <Typography variant="h3">next-template</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
        <Typography variant="overline" color="text.secondary">tRPC</Typography>
        <Chip label={hello.message} color="success" variant="outlined" />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
        <Typography variant="overline" color="text.secondary">Auth</Typography>
        {session
          ? <Chip label={`Signed in as ${session.user?.email}`} color="primary" variant="outlined" />
          : <Chip label="Not signed in" color="default" variant="outlined" />}
      </Box>
    </Box>
  );
}
