import { UTApi } from "uploadthing/server";
import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

export const dynamic = 'force-dynamic';
export async function DELETE(request: Request) {
  const { fileKey } = await request.json();
  const utApi = new UTApi();
  await utApi.deleteFiles(fileKey);
  return Response.json({
    message: "Image Deleted",
  });
}
