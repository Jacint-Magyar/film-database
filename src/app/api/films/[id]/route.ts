export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await fetch(`${process.env.API_ENDPOINT}/films/${params.id}`, {
      method: "DELETE",
    });
    return new Response("Film deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("failed to delete film", { status: 500 });
  }
}
