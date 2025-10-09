#!/bin/bash

# Telegram Notification Script for Playwright Tests
# This script collects test results from Allure reports and sends notifications to Telegram
# Usage: ./send-telegram-notification.sh
# Required environment variables: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GITHUB_REPOSITORY, GITHUB_SHA, etc.

# Get test results from Allure
if [ -d "allure-results" ]; then
    TOTAL_TESTS=$(find allure-results -name "*.json" -exec jq -r '.status // empty' {} \; 2>/dev/null | grep -v "^$" | wc -l)
    PASSED_TESTS=$(find allure-results -name "*.json" -exec jq -r '.status // empty' {} \; 2>/dev/null | grep -c "passed" || echo "0")
    FAILED_TESTS=$(find allure-results -name "*.json" -exec jq -r '.status // empty' {} \; 2>/dev/null | grep -c "failed" || echo "0")
else
    TOTAL_TESTS=0
    PASSED_TESTS=0
    FAILED_TESTS=0
fi

# Ensure variables are numbers
TOTAL_TESTS=$(echo "${TOTAL_TESTS:-0}" | tr -d '\n' | xargs)
PASSED_TESTS=$(echo "${PASSED_TESTS:-0}" | tr -d '\n' | xargs)
FAILED_TESTS=$(echo "${FAILED_TESTS:-0}" | tr -d '\n' | xargs)

# Calculate success rate
if [ "$TOTAL_TESTS" -gt 0 ]; then
    SUCCESS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
else
    SUCCESS_RATE=0
fi

# Determine status
if [ "$JOB_STATUS" == "success" ]; then
    STATUS_COLOR="🟢"
    STATUS_TEXT="SUCCESS"
else
    STATUS_COLOR="🔴"
    STATUS_TEXT="FAILED"
fi

# Create descriptive text for zero values
if [ "$TOTAL_TESTS" -eq 0 ]; then
    TOTAL_TESTS_TEXT="No tests found"
else
    TOTAL_TESTS_TEXT="$TOTAL_TESTS"
fi

if [ "$PASSED_TESTS" -eq 0 ]; then
    PASSED_TESTS_TEXT="No tests passed"
else
    PASSED_TESTS_TEXT="$PASSED_TESTS"
fi

if [ "$FAILED_TESTS" -eq 0 ]; then
    FAILED_TESTS_TEXT="No failures"
else
    FAILED_TESTS_TEXT="$FAILED_TESTS"
fi

# Build HTML-formatted message for Telegram
MESSAGE="🚀 <b>Playwright Tests Completed!</b>

📊 <b>Test Statistics:</b>
• <b>Total tests:</b> $TOTAL_TESTS_TEXT
• <b>Passed:</b> $PASSED_TESTS_TEXT ✅
• <b>Failed:</b> $FAILED_TESTS_TEXT ❌
• <b>Success rate:</b> ${SUCCESS_RATE}%

🔗 <b>Links:</b>
• <b>Repository:</b> https://github.com/$GITHUB_REPOSITORY
• <b>Commit:</b> https://github.com/$GITHUB_REPOSITORY/commit/$GITHUB_SHA
• <b>Report:</b> https://$GITHUB_REPOSITORY_OWNER.github.io/$GITHUB_EVENT_REPOSITORY_NAME/

$STATUS_COLOR <b>Status:</b> $STATUS_TEXT"

# Send message to Telegram using Bot API
curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{
    \"chat_id\": \"$TELEGRAM_CHAT_ID\",
    \"text\": \"$MESSAGE\",
    \"parse_mode\": \"HTML\"
  }"
