#!/usr/bin/env node

const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const fs = require('fs')
const path = require('path')

/**
 * Run Lighthouse audit to validate performance improvements
 */
async function runLighthouseAudit() {
  console.log('🚀 Starting Lighthouse performance audit...')

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage'],
  })

  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
  }

  const runnerResult = await lighthouse.default('http://localhost:4000', options)

  // `.report` is the JSON report as a string
  const reportJson = JSON.parse(runnerResult.report)

  // Extract key performance metrics
  const metrics = {
    performanceScore: reportJson.categories.performance.score,
    firstContentfulPaint: reportJson.audits['first-contentful-paint'].numericValue,
    largestContentfulPaint: reportJson.audits['largest-contentful-paint'].numericValue,
    cumulativeLayoutShift: reportJson.audits['cumulative-layout-shift'].numericValue,
    speedIndex: reportJson.audits['speed-index'].numericValue,
    totalBlockingTime: reportJson.audits['total-blocking-time'].numericValue,
  }

  console.log('\n📊 Performance Audit Results:')
  console.log('================================')
  console.log(`🎯 Performance Score: ${(metrics.performanceScore * 100).toFixed(0)}/100`)
  console.log(`⚡ First Contentful Paint: ${(metrics.firstContentfulPaint / 1000).toFixed(2)}s`)
  console.log(
    `🖼️  Largest Contentful Paint: ${(metrics.largestContentfulPaint / 1000).toFixed(2)}s`
  )
  console.log(`📐 Cumulative Layout Shift: ${metrics.cumulativeLayoutShift.toFixed(3)}`)
  console.log(`📈 Speed Index: ${(metrics.speedIndex / 1000).toFixed(2)}s`)
  console.log(`⏱️  Total Blocking Time: ${metrics.totalBlockingTime.toFixed(0)}ms`)

  // Compare with baseline (from memory bank)
  const baseline = {
    performanceScore: 0.45,
    firstContentfulPaint: 4400,
    largestContentfulPaint: 5500,
    cumulativeLayoutShift: 0.42,
    speedIndex: 4400,
    totalBlockingTime: 230,
  }

  console.log('\n📈 Improvement Analysis:')
  console.log('========================')

  const improvements = {
    performanceScore:
      ((metrics.performanceScore - baseline.performanceScore) / baseline.performanceScore) * 100,
    firstContentfulPaint:
      ((baseline.firstContentfulPaint - metrics.firstContentfulPaint) /
        baseline.firstContentfulPaint) *
      100,
    largestContentfulPaint:
      ((baseline.largestContentfulPaint - metrics.largestContentfulPaint) /
        baseline.largestContentfulPaint) *
      100,
    cumulativeLayoutShift:
      ((baseline.cumulativeLayoutShift - metrics.cumulativeLayoutShift) /
        baseline.cumulativeLayoutShift) *
      100,
    speedIndex: ((baseline.speedIndex - metrics.speedIndex) / baseline.speedIndex) * 100,
    totalBlockingTime:
      ((baseline.totalBlockingTime - metrics.totalBlockingTime) / baseline.totalBlockingTime) * 100,
  }

  console.log(
    `📊 Performance Score: ${improvements.performanceScore > 0 ? '+' : ''}${improvements.performanceScore.toFixed(1)}%`
  )
  console.log(
    `⚡ FCP Improvement: ${improvements.firstContentfulPaint > 0 ? '+' : ''}${improvements.firstContentfulPaint.toFixed(1)}%`
  )
  console.log(
    `🖼️  LCP Improvement: ${improvements.largestContentfulPaint > 0 ? '+' : ''}${improvements.largestContentfulPaint.toFixed(1)}%`
  )
  console.log(
    `📐 CLS Improvement: ${improvements.cumulativeLayoutShift > 0 ? '+' : ''}${improvements.cumulativeLayoutShift.toFixed(1)}%`
  )
  console.log(
    `📈 Speed Index: ${improvements.speedIndex > 0 ? '+' : ''}${improvements.speedIndex.toFixed(1)}%`
  )
  console.log(
    `⏱️  TBT Improvement: ${improvements.totalBlockingTime > 0 ? '+' : ''}${improvements.totalBlockingTime.toFixed(1)}%`
  )

  // Check if targets are met
  console.log('\n🎯 Target Achievement:')
  console.log('======================')

  const targets = {
    performanceScore: 0.9,
    firstContentfulPaint: 1800,
    largestContentfulPaint: 2500,
    cumulativeLayoutShift: 0.1,
  }

  console.log(
    `📊 Performance Score: ${metrics.performanceScore >= targets.performanceScore ? '✅' : '❌'} ${(metrics.performanceScore * 100).toFixed(0)}/100 (target: 90/100)`
  )
  console.log(
    `⚡ FCP Target: ${metrics.firstContentfulPaint <= targets.firstContentfulPaint ? '✅' : '❌'} ${(metrics.firstContentfulPaint / 1000).toFixed(2)}s (target: <1.8s)`
  )
  console.log(
    `🖼️  LCP Target: ${metrics.largestContentfulPaint <= targets.largestContentfulPaint ? '✅' : '❌'} ${(metrics.largestContentfulPaint / 1000).toFixed(2)}s (target: <2.5s)`
  )
  console.log(
    `📐 CLS Target: ${metrics.cumulativeLayoutShift <= targets.cumulativeLayoutShift ? '✅' : '❌'} ${metrics.cumulativeLayoutShift.toFixed(3)} (target: <0.1)`
  )

  // Save detailed report
  const reportPath = path.join(__dirname, '..', 'lighthouse-report.json')
  fs.writeFileSync(reportPath, runnerResult.report)
  console.log(`\n📄 Detailed report saved: ${reportPath}`)

  await chrome.kill()

  // Summary
  const targetsAchieved = [
    metrics.performanceScore >= targets.performanceScore,
    metrics.firstContentfulPaint <= targets.firstContentfulPaint,
    metrics.largestContentfulPaint <= targets.largestContentfulPaint,
    metrics.cumulativeLayoutShift <= targets.cumulativeLayoutShift,
  ].filter(Boolean).length

  console.log(`\n🏆 Summary: ${targetsAchieved}/4 performance targets achieved`)

  if (targetsAchieved >= 3) {
    console.log('🎉 Great job! Phase 1 optimization successfully improved performance!')
  } else if (targetsAchieved >= 2) {
    console.log('👍 Good progress! Consider Phase 2 optimizations for better results.')
  } else {
    console.log(
      '⚠️  More optimization needed. Review implementation and consider advanced techniques.'
    )
  }

  return {
    score: metrics.performanceScore,
    metrics,
    improvements,
    targetsAchieved,
  }
}

// Run if called directly
if (require.main === module) {
  runLighthouseAudit().catch(console.error)
}

module.exports = { runLighthouseAudit }
