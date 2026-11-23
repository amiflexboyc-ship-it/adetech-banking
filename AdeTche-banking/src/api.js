/**
 * AdeTech Digital Banking API Client
 * Automatically connects to http://localhost:5000/api
 */

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname) {
    return `http://${window.location.hostname}:5000/api`;
  }
  return 'http://localhost:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

// Helper for authenticated requests
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adetech_token') || localStorage.getItem('adetech_auth_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Connection timed out. Please ensure the backend server is running on port 5000.');
    }
    throw err;
  }
};

export const api = {
  // Authentication
  auth: {
    login: async (email, password) => {
      const data = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      if (data.token) {
        localStorage.setItem('adetech_token', data.token);
        localStorage.setItem('adetech_auth_token', data.token);
        localStorage.setItem('adetech_is_authenticated', 'true');
        localStorage.setItem('adetech_user', JSON.stringify(data.user));
      }
      return data;
    },

    register: async (userData) => {
      const data = await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      if (data.token) {
        localStorage.setItem('adetech_token', data.token);
        localStorage.setItem('adetech_auth_token', data.token);
        localStorage.setItem('adetech_is_authenticated', 'true');
        localStorage.setItem('adetech_user', JSON.stringify(data.user));
      }
      return data;
    },

    getMe: () => request('/auth/me'),

    verifyEmail: (email, otp) =>
      request('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ email, otp })
      }),

    resendOTP: (email) =>
      request('/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify({ email })
      }),

    forgotPassword: (email) =>
      request('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email })
      }),

    resetPassword: (email, otp, newPassword) =>
      request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, otp, newPassword })
      }),

    logout: async () => {
      try {
        await request('/auth/logout', { method: 'POST' });
      } finally {
        localStorage.removeItem('adetech_token');
        localStorage.removeItem('adetech_auth_token');
        localStorage.removeItem('adetech_is_authenticated');
        localStorage.removeItem('adetech_user');
      }
    }
  },

  // Banking Account
  account: {
    getDetails: () => request('/account/details'),
    getCards: () => request('/account/cards'),
    createCard: (cardData) =>
      request('/account/cards/create', {
        method: 'POST',
        body: JSON.stringify(cardData)
      })
  },

  // Transactions
  transactions: {
    getAll: () => request('/transactions'),
    getSupportedBanks: () => request('/transactions/supported-banks'),
    verifyAccount: (accountNumber, recipientBank, bankCode) =>
      request('/transactions/verify-account', {
        method: 'POST',
        body: JSON.stringify({ accountNumber, recipientBank, bankCode })
      }),
    getPinStatus: () => request('/transactions/pin-status'),
    setPin: (pin) =>
      request('/transactions/set-pin', {
        method: 'POST',
        body: JSON.stringify({ pin })
      }),
    verifyPin: (pin) =>
      request('/transactions/verify-pin', {
        method: 'POST',
        body: JSON.stringify({ pin })
      }),
    sendTransferOTP: (transferData) =>
      request('/transactions/send-otp', {
        method: 'POST',
        body: JSON.stringify(transferData)
      }),
    transfer: (transferData) =>
      request('/transactions/transfer', {
        method: 'POST',
        body: JSON.stringify(transferData)
      }),
    payBill: (billData) =>
      request('/transactions/pay-bill', {
        method: 'POST',
        body: JSON.stringify(billData)
      })
  },

  // Notifications
  notifications: {
    getAll: () => request('/notifications'),
    markAllRead: () =>
      request('/notifications/read-all', {
        method: 'PUT'
      })
  },

  // Contact Form
  contact: {
    submit: (inquiryData) =>
      request('/contact', {
        method: 'POST',
        body: JSON.stringify(inquiryData)
      })
  },

  // Central Banking Admin Operations
  admin: {
    getOverview: () => request('/admin/overview'),
    getCustomers: () => request('/admin/customers'),
    getAccounts: () => request('/admin/accounts'),
    getTransactions: () => request('/admin/transactions'),
    getTransfers: () => request('/admin/transfers'),
    getCards: () => request('/admin/cards'),
    getBills: () => request('/admin/bills'),
    getNotifications: () => request('/admin/notifications'),
    broadcastNotification: (title, message) =>
      request('/admin/notifications', {
        method: 'POST',
        body: JSON.stringify({ title, message })
      }),
    getBranches: () => request('/admin/branches'),
    getReports: () => request('/admin/reports'),
    getSettings: () => request('/admin/settings'),
    updateSettings: (settings) =>
      request('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(settings)
      })
  }
};

export default api;
