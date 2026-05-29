const form = document.getElementById('qaForm');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const summaryOutput = document.getElementById('summaryOutput');
const toggleQaNotes = document.getElementById('toggleQaNotes');
const qaNotes = document.getElementById('qaNotes');

function collectFormData() {
  const assetName = document.getElementById('assetName').value.trim();
  const campaign = document.getElementById('campaign').value.trim();
  const platform = document.getElementById('platform').value;
  const format = document.getElementById('format').value;
  const size = document.getElementById('size').value.trim();
  const version = document.getElementById('version').value.trim();
  const status = document.getElementById('status').value;
  const issues = document.getElementById('issues').value.trim() || 'No major issues found.';
  const handoffNotes = document.getElementById('handoffNotes').value.trim() || 'Ready for review by production lead.';

  const checks = Array.from(form.querySelectorAll('input[name="check"]:checked')).map((input) => input.value);

  return {
    assetName,
    campaign,
    platform,
    format,
    size,
    version,
    status,
    issues,
    handoffNotes,
    checks,
  };
}

function buildSummary(data) {
  const lines = [];
  lines.push('Asset QA Summary');
  lines.push(`Asset: ${data.assetName || 'N/A'}`);
  if (data.campaign) lines.push(`Campaign / Project: ${data.campaign}`);
  lines.push(`Platform: ${data.platform}`);
  lines.push(`Format: ${data.format}`);
  if (data.size) lines.push(`Size / dimensions: ${data.size}`);
  if (data.version) lines.push(`Version: ${data.version}`);
  lines.push(`Status: ${data.status}`);
  lines.push('');
  lines.push('Checks completed:');

  if (data.checks.length) {
    data.checks.forEach((check) => lines.push(`- ${check}`));
  } else {
    lines.push('- No checks marked yet');
  }

  lines.push('');
  lines.push('Issues:');
  lines.push(data.issues);
  lines.push('');
  lines.push('Handoff notes:');
  lines.push(data.handoffNotes);

  return lines.join('\n');
}

function updateSummary() {
  const data = collectFormData();
  summaryOutput.textContent = buildSummary(data);
}

generateBtn.addEventListener('click', () => {
  updateSummary();
});

copyBtn.addEventListener('click', async () => {
  try {
    const text = summaryOutput.textContent;
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Copied ✓';
    setTimeout(() => {
      copyBtn.textContent = 'Copy Summary';
    }, 1800);
  } catch (error) {
    summaryOutput.textContent = 'Copy failed. Please select and copy manually.';
  }
});

toggleQaNotes.addEventListener('click', () => {
  const isHidden = qaNotes.classList.toggle('hidden');
  toggleQaNotes.textContent = isHidden ? 'Show QA Notes' : 'Hide QA Notes';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updateSummary();
});
