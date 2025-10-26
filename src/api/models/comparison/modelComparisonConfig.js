import { promises as fs } from 'fs';

const configCache = new Map();

const parseConfig = (rawConfig) => {
  const rules = new Map();

  Object.entries(rawConfig).forEach(([requestClass, ruleConfig]) => {
    if (!ruleConfig?.target || !ruleConfig?.fields) {
      return;
    }

    const fieldMappings = ruleConfig.fields.reduce((map, fieldRule) => {
      const [reqField, resField = reqField] = fieldRule.split('=').map((s) => s.trim());
      return { ...map, [reqField]: resField };
    }, {});

    rules.set(requestClass, {
      target: ruleConfig.target,
      fieldMappings,
      toString() {
        return `Rule for ${requestClass} → ${this.target}`;
      },
    });
  });

  return Object.freeze(rules);
};

const loadComparisonRules = async (filePath) => {
  if (configCache.has(filePath)) {
    return configCache.get(filePath);
  }

  let rawData;
  try {
    rawData = await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    throw new Error(`Config file not found: ${filePath}`);
  }

  const rules = parseConfig(JSON.parse(rawData));

  configCache.set(filePath, rules);
  return rules;
};

const getRuleFor = (rules, requestClassName) => rules.get(requestClassName) ?? null;

export { loadComparisonRules, getRuleFor };
