import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', '..', 'data', 'store.json');

// Ensure data folder exists
const dataDir = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Default initial state with demo user and transactions
const getInitialData = () => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('AdeTech@2026', salt);
  const defaultPin = bcrypt.hashSync('1234', salt);

  return {
    users: [
      {
        id: 'usr_001',
        name: 'Adekunle Olawale',
        email: 'amiflexboyc@gmail.com',
        phone: '09077108987',
        password: hashedPassword,
        transactionPin: defaultPin,
        tier: 'Tier 3 (Unrestricted)',
        bvnVerified: true,
        ninVerified: true,
        createdAt: new Date().toISOString()
      }
    ],
    accounts: [
      {
        id: 'acc_001',
        userId: 'usr_001',
        accountNumber: '0907710898',
        accountType: 'Personal High-Yield Checking',
        currency: 'NGN',
        balance: 1450000.00,
        ledgerBalance: 1450000.00,
        dailyLimit: 5000000.00
      }
    ],
    cards: [
      {
        id: 'crd_001',
        userId: 'usr_001',
        type: 'virtual',
        brand: 'Visa',
        currency: 'USD',
        cardHolder: 'ADEKUNLE OLAWALE',
        cardNumber: '4532 •••• •••• 8821',
        expiry: '08/29',
        status: 'active',
        spendingLimit: 2500.00,
        billingAddress: 'AdeTech Tower, Lekki Phase 1, Lagos'
      },
      {
        id: 'crd_002',
        userId: 'usr_001',
        type: 'physical',
        brand: 'Mastercard Metal',
        currency: 'NGN',
        cardHolder: 'ADEKUNLE OLAWALE',
        cardNumber: '5399 •••• •••• 1042',
        expiry: '11/30',
        status: 'active',
        spendingLimit: 1000000.00,
        billingAddress: 'AdeTech Tower, Lekki Phase 1, Lagos'
      }
    ],
    transactions: [
      {
        id: 'txn_001',
        userId: 'usr_001',
        type: 'credit',
        amount: 250000.00,
        currency: 'NGN',
        category: 'Inward Wire Transfer',
        senderName: 'Chevron Nigeria Treasury',
        reference: 'ADT-TX-9928172',
        status: 'completed',
        date: new Date(Date.now() - 3600000 * 4).toISOString(),
        description: 'Consulting Contract Settlement'
      },
      {
        id: 'txn_002',
        userId: 'usr_001',
        type: 'debit',
        amount: 45000.00,
        currency: 'NGN',
        category: 'Utility Payment',
        recipientName: 'Ikeja Electric (IKEDC)',
        reference: 'ADT-TX-8831920',
        status: 'completed',
        date: new Date(Date.now() - 3600000 * 24).toISOString(),
        description: 'Prepaid Token Purchase'
      },
      {
        id: 'txn_003',
        userId: 'usr_001',
        type: 'debit',
        amount: 12500.00,
        currency: 'NGN',
        category: 'Airtime & Data',
        recipientName: 'MTN Broadband Top-Up',
        reference: 'ADT-TX-7719284',
        status: 'completed',
        date: new Date(Date.now() - 3600000 * 48).toISOString(),
        description: 'Data Bundle Top-up'
      }
    ],
    notifications: [
      {
        id: 'notif_001',
        userId: 'usr_001',
        title: 'Transfer Received',
        message: 'Your account was credited with ₦250,000.00 from Chevron Nigeria Treasury.',
        time: '4 hours ago',
        isRead: false
      },
      {
        id: 'notif_002',
        userId: 'usr_001',
        title: 'Security Alert',
        message: 'New login detected from Chrome Browser (Lagos, Nigeria). 2FA Active.',
        time: 'Yesterday',
        isRead: false
      },
      {
        id: 'notif_003',
        userId: 'usr_001',
        title: 'Card Activated',
        message: 'Your Virtual USD Card has been successfully created and linked.',
        time: '2 days ago',
        isRead: false
      }
    ],
    inquiries: []
  };
};

class Database {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Error reading data store, initializing fresh state:', err.message);
    }
    const initial = getInitialData();
    this.save(initial);
    return initial;
  }

  save(data = this.data) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save data store:', err.message);
    }
  }

  // Users
  findUserByEmail(email) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.data.users.find((u) => u.id === id);
  }

  addUser(user) {
    this.data.users.push(user);
    this.save();
    return user;
  }

  updateUser(userId, updates) {
    const user = this.findUserById(userId);
    if (user) {
      Object.assign(user, updates);
      this.save();
    }
    return user;
  }

  // Accounts
  findAccountByUserId(userId) {
    return this.data.accounts.find((a) => a.userId === userId);
  }

  findAccountByNumber(accountNumber) {
    return this.data.accounts.find((a) => a.accountNumber === accountNumber);
  }

  addAccount(account) {
    this.data.accounts.push(account);
    this.save();
    return account;
  }

  updateAccountBalance(accountId, newBalance) {
    const account = this.data.accounts.find((a) => a.id === accountId);
    if (account) {
      account.balance = newBalance;
      account.ledgerBalance = newBalance;
      this.save();
    }
    return account;
  }

  // Cards
  getCardsByUserId(userId) {
    return this.data.cards.filter((c) => c.userId === userId);
  }

  addCard(card) {
    this.data.cards.push(card);
    this.save();
    return card;
  }

  // Transactions
  getTransactionsByUserId(userId) {
    return this.data.transactions
      .filter((t) => t.userId === userId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  addTransaction(txn) {
    this.data.transactions.unshift(txn);
    this.save();
    return txn;
  }

  // Notifications
  getNotificationsByUserId(userId) {
    return this.data.notifications.filter((n) => n.userId === userId);
  }

  markAllNotificationsRead(userId) {
    this.data.notifications.forEach((n) => {
      if (n.userId === userId) n.isRead = true;
    });
    this.save();
  }

  // Contact Inquiries
  addInquiry(inquiry) {
    this.data.inquiries.unshift(inquiry);
    this.save();
    return inquiry;
  }

  // Admin Methods
  getAllUsers() {
    return this.data.users.map((u) => {
      const { password, ...safeUser } = u;
      const account = this.findAccountByUserId(u.id);
      return {
        ...safeUser,
        accountNumber: account ? account.accountNumber : 'N/A',
        balance: account ? account.balance : 0,
        accountType: account ? account.accountType : 'Standard Checking'
      };
    });
  }

  getAllAccounts() {
    return this.data.accounts.map((acc) => {
      const user = this.findUserById(acc.userId);
      return {
        ...acc,
        userName: user ? user.name : 'Unknown User',
        userEmail: user ? user.email : 'N/A'
      };
    });
  }

  getAllTransactions() {
    return [...this.data.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  getAllCards() {
    return [...this.data.cards];
  }

  getAllInquiries() {
    return [...this.data.inquiries];
  }

  updateUserTier(userId, tier) {
    const user = this.findUserById(userId);
    if (user) {
      user.tier = tier;
      this.save();
    }
    return user;
  }

  getAdminOverview() {
    const totalDeposits = this.data.accounts.reduce((acc, curr) => acc + (curr.balance || 0), 0) + 1448830000;
    const totalAccounts = this.data.accounts.length + 142849;
    const transactions = this.getAllTransactions();
    const volume24h = transactions.reduce((acc, curr) => acc + (curr.amount || 0), 0) + 85113000;

    return {
      totalDeposits,
      volume24h,
      totalAccounts,
      transactionCount: transactions.length + 3407,
      cbnComplianceRate: 99.98,
      recentTransactions: transactions.slice(0, 10),
      railsStatus: {
        nip: { status: 'operational', latency: '32ms' },
        switch: { status: 'operational', latency: '48ms' },
        bvn: { status: 'operational', latency: 'Direct Link' },
        vault: { status: 'operational', port: 5000 }
      }
    };
  }
}

export const db = new Database();
export default db;
