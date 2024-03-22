import { FreshContext, PageProps } from "$fresh/server.ts";


export default async function Layout(req: Request, ctx: FreshContext) {
    return(
        <div class = "layout">
            <div class = "top">
            <a href = "/agendacsr">Agenda Client Side</a>
            <a href = "/agendassr">Agenda Server Side</a>
            </div>
            <h1>My Agenda</h1>
            <ctx.Component/>
        </div>
    );
}
