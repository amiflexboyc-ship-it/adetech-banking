import https from 'https';

/**
 * Paystack Service for Real Nigerian Bank Account Name Resolution
 * 
 * Legitimate integration with Paystack API:
 * - Bank List: https://api.paystack.co/bank?country=nigeria
 * - Account Resolution: https://api.paystack.co/bank/resolve?account_number=...&bank_code=...
 * - Test Mode Resolution: Bank Code 001 for unlimited test resolves
 * 
 * Strict Banking Standards:
 * - Real API integration only; no simulated or fake names.
 * - Secret keys kept exclusively on the backend (process.env.PAYSTACK_SECRET_KEY).
 * - Comprehensive mapping of official Nigerian CBN bank codes used by Paystack.
 */

// Comprehensive built-in catalog of Paystack Nigerian bank codes
const NIGERIAN_BANK_CATALOG = [
  { name: 'AdeTech Banking', code: '090', isInternal: true, category: 'Core Network' },
  { name: 'Paystack Sandbox Test Bank', code: '001', isTestBank: true, category: 'Sandbox / Test Bank (Unlimited)' },

  // Commercial Banks
  { name: 'Access Bank', code: '044', category: 'Commercial Bank' },
  { name: 'Access Bank (Diamond)', code: '063', category: 'Commercial Bank' },
  { name: 'Citibank Nigeria', code: '023', category: 'Commercial Bank' },
  { name: 'Ecobank Nigeria', code: '050', category: 'Commercial Bank' },
  { name: 'Fidelity Bank', code: '070', category: 'Commercial Bank' },
  { name: 'First Bank of Nigeria', code: '011', category: 'Commercial Bank' },
  { name: 'First City Monument Bank (FCMB)', code: '214', category: 'Commercial Bank' },
  { name: 'Globus Bank', code: '00103', category: 'Commercial Bank' },
  { name: 'Guaranty Trust Bank (GTBank)', code: '058', category: 'Commercial Bank' },
  { name: 'Heritage Bank', code: '030', category: 'Commercial Bank' },
  { name: 'Keystone Bank', code: '082', category: 'Commercial Bank' },
  { name: 'Nova Commercial Bank', code: '561', category: 'Commercial Bank' },
  { name: 'Optimus Bank', code: '107', category: 'Commercial Bank' },
  { name: 'Parallex Bank', code: '526', category: 'Commercial Bank' },
  { name: 'Polaris Bank', code: '076', category: 'Commercial Bank' },
  { name: 'Premium Trust Bank', code: '105', category: 'Commercial Bank' },
  { name: 'Providus Bank', code: '101', category: 'Commercial Bank' },
  { name: 'Signature Bank', code: '106', category: 'Commercial Bank' },
  { name: 'Stanbic IBTC Bank', code: '221', category: 'Commercial Bank' },
  { name: 'Standard Chartered Bank', code: '068', category: 'Commercial Bank' },
  { name: 'Sterling Bank', code: '232', category: 'Commercial Bank' },
  { name: 'SunTrust Bank', code: '100', category: 'Commercial Bank' },
  { name: 'Titan Trust Bank', code: '102', category: 'Commercial Bank' },
  { name: 'Union Bank of Nigeria', code: '032', category: 'Commercial Bank' },
  { name: 'United Bank for Africa (UBA)', code: '033', category: 'Commercial Bank' },
  { name: 'Unity Bank', code: '215', category: 'Commercial Bank' },
  { name: 'Wema Bank', code: '035', category: 'Commercial Bank' },
  { name: 'Zenith Bank', code: '057', category: 'Commercial Bank' },

  // Digital Banks, Fintechs & Payment Service Banks
  { name: 'OPay Digital Services', code: '999992', category: 'Digital Bank / PSB' },
  { name: 'Palmpay Limited', code: '999991', category: 'Digital Bank / PSB' },
  { name: 'Moniepoint Microfinance Bank', code: '50515', category: 'Digital Bank / PSB' },
  { name: 'Kuda Microfinance Bank', code: '50211', category: 'Digital Bank / PSB' },
  { name: 'Carbon (One Finance)', code: '565', category: 'Digital Bank / PSB' },
  { name: 'FairMoney Microfinance Bank', code: '51318', category: 'Digital Bank / PSB' },
  { name: 'Chipper Cash', code: '840', category: 'Digital Bank / PSB' },
  { name: 'Gomoney', code: '100022', category: 'Digital Bank / PSB' },
  { name: 'PocketApp (PiggyVest)', code: '51253', category: 'Digital Bank / PSB' },
  { name: 'VFD Microfinance Bank (VBank)', code: '566', category: 'Digital Bank / PSB' },
  { name: 'Dot Microfinance Bank', code: '50163', category: 'Digital Bank / PSB' },
  { name: 'Raven Bank', code: '50931', category: 'Digital Bank / PSB' },
  { name: 'Mintyn Digital Bank', code: '50304', category: 'Digital Bank / PSB' },
  { name: 'Rubies Bank', code: '125', category: 'Digital Bank / PSB' },
  { name: 'Hope Payment Service Bank', code: '120002', category: 'Digital Bank / PSB' },
  { name: '9PSB (9 Payment Service Bank)', code: '120001', category: 'Digital Bank / PSB' },
  { name: 'MoMo Payment Service Bank', code: '120003', category: 'Digital Bank / PSB' },
  { name: 'Smartcash Payment Service Bank', code: '120004', category: 'Digital Bank / PSB' },

  // Non-Interest & Islamic Banks
  { name: 'Jaiz Bank', code: '301', category: 'Non-Interest Bank' },
  { name: 'TAJBank', code: '302', category: 'Non-Interest Bank' },
  { name: 'Lotus Bank', code: '303', category: 'Non-Interest Bank' },
  { name: 'Alterna Bank', code: '304', category: 'Non-Interest Bank' },

  // Merchant Banks
  { name: 'Coronation Merchant Bank', code: '559', category: 'Merchant Bank' },
  { name: 'FBNQuest Merchant Bank', code: '560', category: 'Merchant Bank' },
  { name: 'FSDH Merchant Bank', code: '501', category: 'Merchant Bank' },
  { name: 'Greenwich Merchant Bank', code: '562', category: 'Merchant Bank' },
  { name: 'Rand Merchant Bank', code: '502', category: 'Merchant Bank' },

  // Microfinance & Mortgage Banks
  { name: 'Accion Microfinance Bank', code: '602', category: 'Microfinance & Mortgage' },
  { name: 'LAPO Microfinance Bank', code: '50400', category: 'Microfinance & Mortgage' },
  { name: 'Mutual Trust Microfinance Bank', code: '50563', category: 'Microfinance & Mortgage' },
  { name: 'Sparkle Microfinance Bank', code: '51310', category: 'Microfinance & Mortgage' },
  { name: 'Eyowo Microfinance Bank', code: '50126', category: 'Microfinance & Mortgage' },
  { name: 'Peace Microfinance Bank', code: '50743', category: 'Microfinance & Mortgage' },
  { name: 'Mainstreet Microfinance Bank', code: '50645', category: 'Microfinance & Mortgage' },
  { name: 'Infinity Trust Mortgage Bank', code: '070016', category: 'Microfinance & Mortgage' },
  { name: 'Abbey Mortgage Bank', code: '404', category: 'Microfinance & Mortgage' },
  { name: 'ASO Savings and Loans', code: '090001', category: 'Microfinance & Mortgage' },
  { name: 'Federal Mortgage Bank of Nigeria', code: '070001', category: 'Microfinance & Mortgage' },
  { name: 'Gateway Mortgage Bank', code: '070009', category: 'Microfinance & Mortgage' },
  { name: 'Platinum Mortgage Bank', code: '070013', category: 'Microfinance & Mortgage' }
];

class PaystackService {
  constructor() {
    this.cachedBanks = null;
    this.lastBankFetch = 0;
    this.CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  }

  /**
   * Check if Paystack Secret Key is configured in environment
   */
  hasSecretKey() {
    const key = process.env.PAYSTACK_SECRET_KEY;
    return Boolean(
      key &&
      key.trim().startsWith('sk_') &&
      !key.toLowerCase().includes('your_') &&
      !key.toLowerCase().includes('placeholder')
    );
  }

  /**
   * Check if running with a Paystack Test Key
   */
  isTestKey() {
    const key = this.getSecretKey();
    return key.startsWith('sk_test_');
  }

  /**
   * Get Paystack Secret Key
   */
  getSecretKey() {
    return process.env.PAYSTACK_SECRET_KEY?.trim() || '';
  }

  /**
   * Fetch live Nigerian bank list from Paystack
   */
  async fetchLiveBanks() {
    const now = Date.now();
    if (this.cachedBanks && now - this.lastBankFetch < this.CACHE_DURATION) {
      return this.cachedBanks;
    }

    try {
      const data = await this.makeHttpsRequest('api.paystack.co', '/bank?country=nigeria&perPage=100', 'GET', null, false);
      if (data && data.status && Array.isArray(data.data)) {
        this.cachedBanks = data.data;
        this.lastBankFetch = now;
        return this.cachedBanks;
      }
    } catch {
      // Fall back to built-in catalog if network fails
    }

    return this.cachedBanks || [];
  }

  /**
   * Retrieve all supported Nigerian banks for transfer selection
   */
  async getSupportedBanks() {
    try {
      const liveBanks = await this.fetchLiveBanks();
      if (liveBanks && liveBanks.length > 0) {
        // Map live banks and prepend AdeTech Banking and Paystack Sandbox Bank
        const mappedLive = liveBanks
          .filter((b) => b.active !== false && b.code !== '001')
          .map((b) => ({
            name: b.name,
            code: b.code,
            slug: b.slug,
            isInternal: false,
            category: this.categorizeBank(b.name, b.type)
          }));

        return [
          { name: 'AdeTech Banking', code: '090', isInternal: true, category: 'Core Network' },
          { name: 'Paystack Sandbox Test Bank', code: '001', isTestBank: true, category: 'Sandbox / Test Bank (Unlimited)' },
          ...mappedLive
        ];
      }
    } catch {
      // Fallback
    }

    return NIGERIAN_BANK_CATALOG;
  }

  /**
   * Categorize bank for organized UI display
   */
  categorizeBank(name, type) {
    const lower = name.toLowerCase();
    if (lower.includes('sandbox') || lower.includes('test bank')) {
      return 'Sandbox / Test Bank (Unlimited)';
    }
    if (lower.includes('opay') || lower.includes('palmpay') || lower.includes('kuda') || lower.includes('moniepoint') || lower.includes('carbon') || lower.includes('psb')) {
      return 'Digital Bank / PSB';
    }
    if (lower.includes('merchant')) {
      return 'Merchant Bank';
    }
    if (lower.includes('microfinance') || lower.includes('mfb') || lower.includes('mortgage')) {
      return 'Microfinance & Mortgage';
    }
    if (lower.includes('jaiz') || lower.includes('taj') || lower.includes('lotus')) {
      return 'Non-Interest Bank';
    }
    return 'Commercial Bank';
  }

  /**
   * Resolve bank code from bank name or code
   */
  getBankCode(bankName, bankCode) {
    if (bankCode && String(bankCode).trim().length >= 3) {
      return String(bankCode).trim();
    }

    if (!bankName) return null;
    const cleanName = bankName.trim().toLowerCase();

    // Check built-in catalog first
    const catalogMatch = NIGERIAN_BANK_CATALOG.find((b) => {
      const bLower = b.name.toLowerCase();
      return (
        bLower === cleanName ||
        cleanName.includes(bLower) ||
        bLower.includes(cleanName)
      );
    });

    if (catalogMatch) {
      return catalogMatch.code;
    }

    // Check cached live banks if available
    if (this.cachedBanks) {
      const liveMatch = this.cachedBanks.find((b) => {
        const bLower = b.name.toLowerCase();
        return (
          bLower === cleanName ||
          cleanName.includes(bLower) ||
          bLower.includes(cleanName)
        );
      });
      if (liveMatch) return liveMatch.code;
    }

    return null;
  }

  /**
   * Send account number & bank code to Paystack Account Name Resolution API
   * 
   * @param {string} accountNumber 10-digit NUBAN
   * @param {string} bankCode Paystack bank code (e.g. 058 for GTBank, 044 for Access, 001 for Sandbox Test Bank)
   * @returns {Promise<{accountName: string, accountNumber: string, isTestModeLimit?: boolean}>}
   */
  async resolveAccountNumber(accountNumber, bankCode) {
    const cleanAcc = String(accountNumber || '').trim();
    const cleanCode = String(bankCode || '').trim();

    if (!/^\d{10}$/.test(cleanAcc)) {
      throw new Error('Account number must be exactly 10 numeric digits.');
    }

    if (!cleanCode) {
      throw new Error('Destination bank code is required for account resolution.');
    }

    // Check if secret key is present
    if (!this.hasSecretKey()) {
      const error = new Error(
        'Real-time bank verification requires a configured PAYSTACK_SECRET_KEY in backend/.env. Please configure your Paystack live or test secret key to resolve external Nigerian bank accounts.'
      );
      error.code = 'PAYSTACK_KEY_MISSING';
      throw error;
    }

    const secretKey = this.getSecretKey();
    const path = `/bank/resolve?account_number=${encodeURIComponent(cleanAcc)}&bank_code=${encodeURIComponent(cleanCode)}`;

    try {
      const response = await this.makeHttpsRequest('api.paystack.co', path, 'GET', null, true, secretKey);

      if (response && response.status === true && response.data) {
        const accountName = response.data.account_name;
        if (!accountName || !accountName.trim()) {
          throw new Error('Beneficiary account name was not returned by the destination bank.');
        }

        return {
          accountName: accountName.trim().toUpperCase(),
          accountNumber: response.data.account_number || cleanAcc
        };
      }

      const msg = response?.message || 'Could not resolve account name. Please verify the account number and bank.';
      throw new Error(msg);
    } catch (err) {
      // Handle Paystack Test Mode Limit (3 live bank resolves daily limit exceeded on test keys)
      const isDailyLimitExceeded =
        err.message &&
        (err.message.includes('limit of 3 live bank resolves exceeded') ||
         err.message.includes('test bank codes 001') ||
         err.message.includes('upgrade to live mode'));

      if (this.isTestKey() && isDailyLimitExceeded) {
        // Automatically resolve using Paystack's official test bank code 001 for unlimited test verification
        try {
          const testPath = `/bank/resolve?account_number=${encodeURIComponent(cleanAcc)}&bank_code=001`;
          const testResponse = await this.makeHttpsRequest('api.paystack.co', testPath, 'GET', null, true, secretKey);

          if (testResponse && testResponse.status === true && testResponse.data) {
            return {
              accountName: testResponse.data.account_name.trim().toUpperCase(),
              accountNumber: testResponse.data.account_number || cleanAcc,
              isTestModeLimit: true
            };
          }
        } catch {
          // If even test code 001 fails, throw informative message
        }

        const limitError = new Error(
          'Paystack Test Mode Limit: Maximum 3 live bank resolutions exceeded for today. You can select "Paystack Sandbox Test Bank" (Code 001) for unlimited test resolutions, or upgrade to live mode (sk_live_...) in backend/.env.'
        );
        limitError.code = 'PAYSTACK_TEST_LIMIT_EXCEEDED';
        throw limitError;
      }

      throw err;
    }
  }

  /**
   * Low-level HTTPS request wrapper
   */
  makeHttpsRequest(hostname, path, method = 'GET', body = null, requireAuth = false, secretKey = '') {
    return new Promise((resolve, reject) => {
      const headers = {
        'User-Agent': 'AdeTech-Banking-Server/1.0',
        'Accept': 'application/json'
      };

      if (requireAuth && secretKey) {
        headers['Authorization'] = `Bearer ${secretKey}`;
      }

      let payload = null;
      if (body) {
        payload = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
        headers['Content-Length'] = Buffer.byteLength(payload);
      }

      const options = {
        hostname,
        port: 443,
        path,
        method,
        headers,
        timeout: 10000
      };

      const req = https.request(options, (res) => {
        let rawData = '';

        res.on('data', (chunk) => {
          rawData += chunk;
        });

        res.on('end', () => {
          try {
            const parsed = JSON.parse(rawData);

            if (res.statusCode === 401) {
              const err = new Error('Paystack API authentication failed. Please verify your PAYSTACK_SECRET_KEY in backend/.env.');
              err.code = 'PAYSTACK_AUTH_FAILED';
              return reject(err);
            }

            if (res.statusCode >= 400 && !parsed.status) {
              const errMsg = parsed.message || `Paystack request failed with status ${res.statusCode}`;
              const err = new Error(errMsg);
              err.statusCode = res.statusCode;
              return reject(err);
            }

            resolve(parsed);
          } catch {
            reject(new Error(`Failed to parse response from payment provider (Status ${res.statusCode}).`));
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Connection to payment provider timed out after 10 seconds.'));
      });

      req.on('error', (err) => {
        reject(new Error(`Network error connecting to payment provider: ${err.message}`));
      });

      if (payload) {
        req.write(payload);
      }

      req.end();
    });
  }
}

export default new PaystackService();
