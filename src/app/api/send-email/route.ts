import { NextRequest, NextResponse } from 'next/server'
import * as postmark from 'postmark'
import { Exchange, Vector } from '@/types'

const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_TOKEN!)

function getMessage({
  exchange,
  vector,
}: {
  exchange: Exchange
  vector: Vector
}) {
  return {
    From: 'hello@cozy.exchange',
    To: vector.from.email,
    Subject: `Your match for ${exchange.name}`,
    TextBody: `${
      exchange.name
        ? `Your match for ${exchange.name}`
        : 'Your match for a gift exchange'
    }\n\nHello ${vector.from.name},\n\n${
      exchange.name
        ? `You have been included in a gift exchange named ${exchange.name}.`
        : 'You have been included in a gift exchange.'
    }\n\nThe person you are assigned to is:\n\n${
      vector.to.name
    }\n\nYou will give a gift to ${
      vector.to.name
    }, and someone will give you a gift as part of the exchange.\n\n${
      exchange.contact.name &&
      `If you have any questions, get in touch with ${exchange.contact.name}${
        exchange.contact.email && ` at ${exchange.contact.email}`
      }.\n\n`
    }${
      exchange.message &&
      `Here's an extra message with details about the exchange:\n${exchange.message}\n\n`
    }Powered by www.cozy.exchange
    `,
    HtmlBody: `
      <h1>${
        exchange.name
          ? `Your match for ${exchange.name}`
          : 'Your match for a gift exchange'
      }</h1>
      <p>Hello ${vector.from.name},</p>
      <p>${
        exchange.name
          ? `You have been included in a gift exchange named ${exchange.name}.`
          : 'You have been included in a gift exchange.'
      }</p>
      <p>The person you are assigned to is:</p>
      <h2>${vector.to.name}</h2>
      <p>You will give a gift to ${
        vector.to.name
      }, and someone will give you a gift as part of the exchange.</p>
      ${
        exchange.contact.name &&
        `<p>If you have any questions, get in touch with ${
          exchange.contact.name
        }${exchange.contact.email && ` at ${exchange.contact.email}`}.</p>`
      }
      ${
        exchange.message &&
        `<p>Here's an extra message with details about the exchange:</p><p><i>${exchange.message}</i></p>`
      }
      <hr />
      <div><small>Powered by <a href="https://www.cozy.exchange/" target="_blank">cozy.exchange</a></small></div>
    `,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { exchange, vectors }: { exchange: Exchange; vectors: Vector[] } =
      await request.json()
    const emailResponse = await client.sendEmailBatch(
      vectors.map((vector) => getMessage({ exchange, vector })),
    )
    return NextResponse.json({ emailResponse })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ err })
  }
}
