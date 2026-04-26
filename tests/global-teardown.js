async function globalTeardown() {
  console.log('Starting global teardown...');

  try {
    // Clean up resources, stop mock servers, clear database
    console.log('✓ Global teardown completed');
  } catch (error) {
    console.error('✗ Global teardown failed:', error);
    process.exit(1);
  }
}

export default globalTeardown;
