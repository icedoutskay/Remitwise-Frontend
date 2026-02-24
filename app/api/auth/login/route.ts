import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, signature } = body;

    const testWallet = process.env.TEST_WALLET_ADDRESS || 'GDEMOXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    const testSignature = process.env.TEST_SIGNATURE || 'mock-signature';

    if (address === testWallet && signature === testSignature) {
      const response = NextResponse.json({ success: true, token: 'mock-session-token' });
      // Set a mock session cookie for subsequent protected requests
      response.cookies.set('session', 'mock-session-cookie', { httpOnly: true, path: '/' });
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }
}
