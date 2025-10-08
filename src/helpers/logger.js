class Logger {
  static info(message) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  static error(message) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
  }

  static debug(message) {
    if (process.env.DEBUG === 'true') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
  }

  static step(message) {
    console.log(`\n→ ${message}`);
  }

  static testStart(testName) {
    console.log(`\n${'='.repeat(80)}\n▶ Starting test: ${testName}\n${'='.repeat(80)}`);
  }

  static testEnd(testName, status) {
    const symbol = status === 'passed' ? '✓' : '✗';
    console.log(`\n${symbol} Test ${status}: ${testName}\n${'='.repeat(80)}\n`);
  }
}

module.exports = Logger;
