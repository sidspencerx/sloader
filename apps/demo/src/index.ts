import { createChromiumRuntime } from '@sloader/core';

async function main() {
  const url = process.argv[2] || 'https://example.com';

  console.log(`Ingesting: ${url}`);

  const runtime = await createChromiumRuntime();

  try {
    await runtime.load(url);
    await runtime.scrollToBottom();
    const result = await runtime.extract();

    console.log('\n--- TEXT (first 2000 chars) ---\n');
    console.log(result.text.slice(0, 2000));

    console.log('\n--- DIAGNOSTICS ---\n');
    console.log(result.diagnostics);
  } catch (err) {
    console.error('Error during ingestion:', err);
  } finally {
    await runtime.close();
  }
}

main();
