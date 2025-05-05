// api/crear-lead.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, correo, telefono, mensaje, gclid } = req.body;

  const zohoAccessToken = 'AQUÍ_TU_TOKEN_DE_ACCESO'; // Reemplaza con el access token válido de Zoho

  try {
    const response = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${zohoAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [
          {
            Last_Name: nombre || 'Sin nombre',
            Email: correo,
            Phone: telefono,
            Description: mensaje,
            GCLID__c: gclid || '',
            Lead_Source: 'Sitio Web',
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ message: 'Lead creado en Zoho CRM', data });
    } else {
      return res.status(500).json({ error: 'Error en Zoho CRM', details: data });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error en el servidor', details: error.message });
  }
}
