import https from 'https';

/**
 * Dojah Service for Real-time Nigerian Bank Account Resolution & KYC Verification
 * 
 * Legitimate integration with Dojah Financial & KYC API (https://dojah.io):
 * - Bank List: https://api.dojah.io/api/v1/general/banks
 * - Account Name Resolution: https://api.dojah.io/api/v1/resolve/account?account_number=...&bank_code=...
 * - BVN Verification: https://api.dojah.io/api/v1/kyc/bvn/full?bvn=...
 * - NIN Verification: https://api.dojah.io/api/v1/kyc/nin?nin=...
 * 
 * Strict Banking Standards:
 * - Real API integration only; no simulated or fake account names.
 * - Secret credentials kept exclusively in backend environment variables:
 *   process.env.DOJAH_PRIVATE_KEY
 *   process.env.DOJAH_APP_ID
 * - Clean CBN NUBAN validation and error propagation.
 */

// Comprehensive built-in catalog of Nigerian CBN bank codes used by Dojah & NIBSS
const NIGERIAN_BANK_CATALOG = [
  { name: 'AdeTech Banking', code: '090', isInternal: true, category: 'Core Network' },

  // Commercial Banks (CBN Licensed)
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

class DojahService {
  constructor() {
    this.cachedBanks = null;
    this.lastBankFetch = 0;
    this.CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
    this.hostname = 'api.dojah.io';
  }

  /**
   * Check if Dojah credentials (Private Key and App ID) are configured in environment
   */
  hasCredentials() {
    const privateKey = this.getPrivateKey();
    const appId = this.getAppId();
    return Boolean(
      privateKey &&
      appId &&
      !privateKey.toLowerCase().includes('your_') &&
      !appId.toLowerCase().includes('your_')
    );
  }

  /**
   * Check if running with Dojah Test / Sandbox credentials
   */
  isTestMode() {
    const key = this.getPrivateKey();
    return key.startsWith('test_') || key.startsWith('sandbox_');
  }

  /**
   * Get Dojah Private Key from environment
   */
  getPrivateKey() {
    return (process.env.DOJAH_PRIVATE_KEY || process.env.DOJAH_SECRET_KEY || '').trim();
  }

  /**
   * Get Dojah App ID from environment
   */
  getAppId() {
    return (process.env.DOJAH_APP_ID || '').trim();
  }

  /**
   * Fetch live Nigerian bank list from Dojah API
   */
  async fetchLiveBanks() {
    const now = Date.now();
    if (this.cachedBanks && now - this.lastBankFetch < this.CACHE_DURATION) {
      return this.cachedBanks;
    }

    if (!this.hasCredentials()) {
      return NIGERIAN_BANK_CATALOG;
    }

    try {
      const data = await this.makeHttpsRequest('/api/v1/general/banks', 'GET');
      if (data && Array.isArray(data.entity)) {
        this.cachedBanks = data.entity;
        this.lastBankFetch = now;
        return this.cachedBanks;
      }
    } catch {
      // Fall back to built-in catalog if network request fails
    }

    return this.cachedBanks || NIGERIAN_BANK_CATALOG;
  }

  /**
   * Retrieve all supported Nigerian banks for transfer selection
   */
  async getSupportedBanks() {
    try {
      const liveBanks = await this.fetchLiveBanks();
      if (liveBanks && liveBanks.length > 0) {
        const mappedLive = liveBanks
          .filter((b) => b && (b.code || b.bank_code))
          .map((b) => {
            const code = String(b.code || b.bank_code || '').trim();
            const name = b.name || b.bank_name || '';
            return {
              name,
              code,
              isInternal: false,
              category: this.categorizeBank(name)
            };
          });

        return [
          { name: 'AdeTech Banking', code: '090', isInternal: true, category: 'Core Network' },
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
  categorizeBank(name) {
    const lower = String(name || '').toLowerCase();
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
   * Resolve bank code from bank name or existing code
   */
  getBankCode(bankName, bankCode) {
    if (bankCode && String(bankCode).trim().length >= 3) {
      return String(bankCode).trim();
    }

    if (!bankName) return null;
    const cleanName = bankName.trim().toLowerCase();

    // Check built-in catalog
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

    // Check cached live banks
    if (this.cachedBanks && Array.isArray(this.cachedBanks)) {
      const liveMatch = this.cachedBanks.find((b) => {
        const bName = String(b.name || b.bank_name || '').toLowerCase();
        return (
          bName === cleanName ||
          cleanName.includes(bName) ||
          bName.includes(cleanName)
        );
      });
      if (liveMatch) {
        return liveMatch.code || liveMatch.bank_code;
      }
    }

    return null;
  }

  /**
   * Resolve 10-digit NUBAN Nigerian Bank Account Name via Dojah API
   * 
   * Endpoint: GET /api/v1/resolve/account?account_number=...&bank_code=...
   * 
   * @param {string} accountNumber 10-digit NUBAN account number
   * @param {string} bankCode 3-digit CBN bank code (e.g. 058 for GTBank, 044 for Access Bank)
   * @returns {Promise<{accountName: string, accountNumber: string, bankCode: string}>}
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

    if (!this.hasCredentials()) {
      const error = new Error(
        'Real-time bank verification requires configured DOJAH_PRIVATE_KEY and DOJAH_APP_ID in backend/.env. Please configure your Dojah credentials to resolve Nigerian bank accounts.'
      );
      error.code = 'DOJAH_CREDENTIALS_MISSING';
      throw error;
    }

    const path = `/api/v1/resolve/account?account_number=${encodeURIComponent(cleanAcc)}&bank_code=${encodeURIComponent(cleanCode)}`;

    try {
      const response = await this.makeHttpsRequest(path, 'GET');

      if (response && response.entity) {
        const entity = response.entity;
        const accountName = entity.account_name || entity.accountName || entity.name;

        if (!accountName || !accountName.trim()) {
          throw new Error('Beneficiary account name was not returned by destination bank.');
        }

        return {
          accountName: accountName.trim().toUpperCase(),
          accountNumber: entity.account_number || entity.accountNumber || cleanAcc,
          bankCode: cleanCode,
          bvn: entity.bvn || null
        };
      }

      const msg = response?.error || response?.message || 'Could not resolve account name with Dojah. Please verify the account number and bank.';
      throw new Error(msg);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Verify Nigerian BVN (Bank Verification Number) via Dojah KYC API
   * 
   * Endpoint: GET /api/v1/kyc/bvn/full?bvn=...
   * 
   * @param {string} bvn 11-digit BVN
   * @returns {Promise<object>} BVN customer details
   */
  async resolveBVN(bvn) {
    const cleanBvn = String(bvn || '').trim();
    if (!/^\d{11}$/.test(cleanBvn)) {
      throw new Error('BVN must be exactly 11 numeric digits.');
    }

    if (!this.hasCredentials()) {
      const error = new Error('Dojah credentials missing. Please set DOJAH_PRIVATE_KEY and DOJAH_APP_ID in backend/.env.');
      error.code = 'DOJAH_CREDENTIALS_MISSING';
      throw error;
    }

    const path = `/api/v1/kyc/bvn/full?bvn=${encodeURIComponent(cleanBvn)}`;
    const response = await this.makeHttpsRequest(path, 'GET');

    if (response && response.entity) {
      return response.entity;
    }

    throw new Error(response?.error || response?.message || 'Could not verify BVN details.');
  }

  /**
   * Verify Nigerian NIN (National Identity Number) via Dojah KYC API
   * 
   * Endpoint: GET /api/v1/kyc/nin?nin=...
   * 
   * @param {string} nin 11-digit NIN
   * @returns {Promise<object>} NIN customer details
   */
  async resolveNIN(nin) {
    const cleanNin = String(nin || '').trim();
    if (!/^\d{11}$/.test(cleanNin)) {
      throw new Error('NIN must be exactly 11 numeric digits.');
    }

    if (!this.hasCredentials()) {
      const error = new Error('Dojah credentials missing. Please set DOJAH_PRIVATE_KEY and DOJAH_APP_ID in backend/.env.');
      error.code = 'DOJAH_CREDENTIALS_MISSING';
      throw error;
    }

    const path = `/api/v1/kyc/nin?nin=${encodeURIComponent(cleanNin)}`;
    const response = await this.makeHttpsRequest(path, 'GET');

    if (response && response.entity) {
      return response.entity;
    }

    throw new Error(response?.error || response?.message || 'Could not verify NIN details.');
  }

  /**
   * Verify Nigerian Phone Number via Dojah KYC API
   * 
   * Endpoint: GET /api/v1/kyc/phone_number?phone=...
   * 
   * @param {string} phone Nigerian phone number
   * @returns {Promise<object>} Phone KYC profile
   */
  async resolvePhoneNumber(phone) {
    const cleanPhone = String(phone || '').trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      throw new Error('Phone number must contain at least 10 numeric digits.');
    }

    if (!this.hasCredentials()) {
      const error = new Error('Dojah credentials missing. Please set DOJAH_PRIVATE_KEY and DOJAH_APP_ID in backend/.env.');
      error.code = 'DOJAH_CREDENTIALS_MISSING';
      throw error;
    }

    const path = `/api/v1/kyc/phone_number?phone=${encodeURIComponent(cleanPhone)}`;
    const response = await this.makeHttpsRequest(path, 'GET');

    if (response && response.entity) {
      return response.entity;
    }

    throw new Error(response?.error || response?.message || 'Could not verify phone number details.');
  }

  /**
   * Low-level HTTPS request wrapper with Dojah API authentication headers
   */
  makeHttpsRequest(path, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
      const privateKey = this.getPrivateKey();
      const appId = this.getAppId();

      const headers = {
        'User-Agent': 'AdeTech-Banking-Server/1.0',
        'Accept': 'application/json',
        'Authorization': privateKey,
        'AppId': appId
      };

      let payload = null;
      if (body) {
        payload = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
        headers['Content-Length'] = Buffer.byteLength(payload);
      }

      const options = {
        hostname: this.hostname,
        port: 443,
        path,
        method,
        headers,
        timeout: 12000
      };

      const req = https.request(options, (res) => {
        let rawData = '';

        res.on('data', (chunk) => {
          rawData += chunk;
        });

        res.on('end', () => {
          try {
            const parsed = JSON.parse(rawData);

            if (res.statusCode === 401 || res.statusCode === 403) {
              const err = new Error('Dojah authentication failed. Please verify your DOJAH_PRIVATE_KEY and DOJAH_APP_ID in backend/.env.');
              err.code = 'DOJAH_AUTH_FAILED';
              err.statusCode = res.statusCode;
              return reject(err);
            }

            if (res.statusCode >= 400) {
              const errMsg = parsed.error || parsed.message || `Dojah request failed with status code ${res.statusCode}.`;
              const err = new Error(errMsg);
              err.statusCode = res.statusCode;
              return reject(err);
            }

            resolve(parsed);
          } catch {
            reject(new Error(`Failed to parse response from Dojah API (HTTP Status ${res.statusCode}).`));
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Connection to Dojah API timed out after 12 seconds.'));
      });

      req.on('error', (err) => {
        reject(new Error(`Network error connecting to Dojah API: ${err.message}`));
      });

      if (payload) {
        req.write(payload);
      }

      req.end();
    });
  }
}

export default new DojahService();
