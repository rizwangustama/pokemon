import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch Pokemon data' },
            { status: 500 }
        );
    }
}
