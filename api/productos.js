export default async function handler(req, res) {

    const NOTION_TOKEN = process.env.NOTION_TOKEN;
    const DATABASE_ID = process.env.DATABASE_ID;

    const response = await fetch(
        `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${NOTION_TOKEN}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json"
            }
        }
    );

    const data = await response.json();

    const productos = data.results.map(item => ({
        id: item.id,
        nombre: item.properties.Nombre.title[0]?.plain_text || "",
        precio: item.properties.PVP.number || 0
    }));

    res.status(200).json(productos);
}
