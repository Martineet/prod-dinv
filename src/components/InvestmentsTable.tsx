'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { formatBtc, formatMoneyRounded } from '@/lib/format';
import { Investment, InvestmentFormInput, InvestmentRow, Portfolio } from '@/lib/types';

type MutationState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

type InvestmentDraft = {
  asset: string;
  amount: string;
  eurAmount: string;
  price: string;
  date: string;
};

type DraftErrors = {
  asset?: string;
  amount?: string;
  eurAmount?: string;
  price?: string;
  date?: string;
};

type InvestmentsTableProps = {
  investments: Investment[];
  rows: InvestmentRow[];
  loading: boolean;
  error: string | null;
  currentBtcPrice: number;
  portfolios: Portfolio[];
  selectedPortfolioId: string | null;
  selectedPortfolioName: string | null;
  onSelectPortfolio: (portfolioId: string) => void;
  onCreatePortfolio: (name: string) => Promise<boolean>;
  onRenamePortfolio: (portfolioId: string, newName: string) => Promise<boolean>;
  onDeletePortfolio: (portfolioId: string) => Promise<boolean>;
  onCreateInvestment: (investmentData: Omit<InvestmentFormInput, 'portfolios_id'> & { portfolios_id?: string }) => Promise<boolean>;
  onUpdateInvestment: (
    investmentId: string,
    updates: Omit<InvestmentFormInput, 'portfolios_id'> & { portfolios_id?: string }
  ) => Promise<boolean>;
  onDeleteInvestment: (investmentId: string, portfolioIdOverride?: string) => Promise<boolean>;
  creatingPortfolio: MutationState;
  renamingPortfolio: MutationState;
  deletingPortfolio: MutationState;
  creatingInvestment: MutationState;
  updatingInvestment: MutationState;
  deletingInvestment: MutationState;
};

const EUR = '\u20AC';

function todayInputDate(): string {
  return new Date().toISOString().slice(0, 10);
}

const EMPTY_DRAFT: InvestmentDraft = {
  asset: 'buy',
  amount: '',
  eurAmount: '',
  price: '',
  date: todayInputDate()
};

const TRANSFER_TYPES = new Set(['transfer-in', 'transfer-out']);
const TRANSACTION_TYPES = ['buy', 'sell', 'transfer-in', 'transfer-out'] as const;

function normalizeTransactionType(value: string | null | undefined): string {
  const normalized = (value ?? '').trim().toLowerCase();
  return TRANSACTION_TYPES.includes(normalized as (typeof TRANSACTION_TYPES)[number]) ? normalized : 'buy';
}

function isTransferType(value: string): boolean {
  return TRANSFER_TYPES.has(value);
}

function eurAmountLabel(value: string): string {
  if (value === 'sell') return `Money divested (${EUR})`;
  return `Money invested (${EUR})`;
}

function isValidDate(value: string): boolean {
  if (!value) return false;
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return false;
  const date = new Date(timestamp);
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}` === value;
}

function validateDraft(draft: InvestmentDraft): DraftErrors {
  const errors: DraftErrors = {};
  const amount = Number(draft.amount);
  const eurAmount = Number(draft.eurAmount);
  const price = Number(draft.price);
  const transfer = isTransferType(draft.asset);

  if (!draft.asset.trim()) {
    errors.asset = 'Type is required';
  }

  if (!draft.amount.trim()) {
    errors.amount = 'Amount is required';
  } else if (!Number.isFinite(amount) || amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  if (!transfer) {
    if (!draft.eurAmount.trim()) {
      errors.eurAmount = 'EUR amount is required';
    } else if (!Number.isFinite(eurAmount) || eurAmount <= 0) {
      errors.eurAmount = 'EUR amount must be greater than 0';
    }
  }

  if (transfer) {
    if (draft.price.trim() && (!Number.isFinite(price) || price < 0)) {
      errors.price = 'Price cannot be negative';
    }
  } else if (!draft.price.trim()) {
    errors.price = 'Price is required';
  } else if (!Number.isFinite(price) || price <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  if (!draft.date.trim()) {
    errors.date = 'Date is required';
  } else if (!isValidDate(draft.date)) {
    errors.date = 'Date must be valid';
  }

  return errors;
}

function mapInvestmentToDraft(investment: Investment): InvestmentDraft {
  return {
    asset: normalizeTransactionType(investment.type),
    amount: String(investment.btc_amount ?? ''),
    eurAmount: String(investment.eur_amount ?? ''),
    price: String(investment.price ?? ''),
    date: investment.date_swap?.slice(0, 10) ?? todayInputDate()
  };
}

function findInvestmentByRowId(investments: Investment[], rowId: string): Investment | null {
  return (
    investments.find(
      (investment) =>
        String(investment.investments_id ?? `${investment.portfolios_id}-${investment.date_swap}`) === rowId
    ) ??
    null
  );
}

function formatMoneyOrHyphen(value: number) {
  if (!Number.isFinite(value) || value <= 0) return '-';
  return `${formatMoneyRounded(value)} ${EUR}`;
}

function formatMoneyOrHyphenNullable(value: number | null) {
  if (value === null) return '-';
  return `${formatMoneyRounded(value)} ${EUR}`;
}

export function InvestmentsTable({
  investments,
  rows,
  loading,
  error,
  currentBtcPrice,
  portfolios,
  selectedPortfolioId,
  selectedPortfolioName,
  onSelectPortfolio,
  onCreatePortfolio,
  onRenamePortfolio,
  onDeletePortfolio,
  onCreateInvestment,
  onUpdateInvestment,
  onDeleteInvestment,
  creatingPortfolio,
  renamingPortfolio,
  deletingPortfolio,
  creatingInvestment,
  updatingInvestment,
  deletingInvestment
}: InvestmentsTableProps) {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionMode, setTransactionMode] = useState<'create' | 'edit'>('create');
  const [editingInvestmentId, setEditingInvestmentId] = useState<string | null>(null);
  const [draft, setDraft] = useState<InvestmentDraft>(EMPTY_DRAFT);
  const [draftErrors, setDraftErrors] = useState<DraftErrors>({});
  const [isPriceManuallyEdited, setIsPriceManuallyEdited] = useState(false);
  const [isPortfolioManagerOpen, setIsPortfolioManagerOpen] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState('');
  const [renamePortfolioName, setRenamePortfolioName] = useState('');
  const [managerPortfolioId, setManagerPortfolioId] = useState<string | null>(selectedPortfolioId);
  const [expandedPortfolioSection, setExpandedPortfolioSection] = useState<'rename' | 'create' | null>(null);
  const portfolioMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setManagerPortfolioId(selectedPortfolioId ?? portfolios[0]?.portfolios_id ?? null);
  }, [portfolios, selectedPortfolioId]);

  useEffect(() => {
    if (!managerPortfolioId) {
      setRenamePortfolioName('');
      return;
    }

    const current = portfolios.find((portfolio) => portfolio.portfolios_id === managerPortfolioId);
    setRenamePortfolioName(current?.name ?? '');
  }, [managerPortfolioId, portfolios]);

  const selectedManagerPortfolio = useMemo(() => {
    if (!managerPortfolioId) return null;
    return portfolios.find((portfolio) => portfolio.portfolios_id === managerPortfolioId) ?? null;
  }, [managerPortfolioId, portfolios]);

  const openCreateTransactionModal = () => {
    setTransactionMode('create');
    setEditingInvestmentId(null);
    setDraft({ ...EMPTY_DRAFT, date: todayInputDate() });
    setDraftErrors({});
    setIsPriceManuallyEdited(false);
    setIsTransactionModalOpen(true);
  };

  const openEditTransactionModal = (investmentId: string) => {
    const investment = findInvestmentByRowId(investments, investmentId);
    if (!investment) return;

    setTransactionMode('edit');
    setEditingInvestmentId(investmentId);
    setDraft(mapInvestmentToDraft(investment));
    setDraftErrors({});
    setIsPriceManuallyEdited(false);
    setIsTransactionModalOpen(true);
  };

  const closeTransactionModal = () => {
    setIsTransactionModalOpen(false);
    setEditingInvestmentId(null);
    setDraft(EMPTY_DRAFT);
    setDraftErrors({});
    setIsPriceManuallyEdited(false);
  };

  const showEurAmount = !isTransferType(draft.asset);

  useEffect(() => {
    if (!showEurAmount || isPriceManuallyEdited) return;

    const amount = Number(draft.amount);
    const eurAmount = Number(draft.eurAmount);

    if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(eurAmount) || eurAmount <= 0) return;

    const calculatedPrice = eurAmount / amount;
    if (!Number.isFinite(calculatedPrice)) return;

    setDraft((prev) => {
      const nextPrice = calculatedPrice.toFixed(2);
      if (prev.price === nextPrice) return prev;
      return { ...prev, price: nextPrice };
    });
  }, [draft.amount, draft.eurAmount, isPriceManuallyEdited, showEurAmount]);

  const handleAmountChange = (rawValue: string) => {
    const [integerPart, decimalPart = ''] = rawValue.split('.');
    const capped = decimalPart.length > 8 ? `${integerPart}.${decimalPart.slice(0, 8)}` : rawValue;
    setDraft((prev) => ({ ...prev, amount: capped }));
  };

  const handleEurAmountChange = (rawValue: string) => {
    const [integerPart, decimalPart = ''] = rawValue.split('.');
    const capped = decimalPart.length > 2 ? `${integerPart}.${decimalPart.slice(0, 2)}` : rawValue;
    setDraft((prev) => ({ ...prev, eurAmount: capped }));
  };

  const handlePriceChange = (rawValue: string) => {
    const [integerPart, decimalPart = ''] = rawValue.split('.');
    const capped = decimalPart.length > 2 ? `${integerPart}.${decimalPart.slice(0, 2)}` : rawValue;
    setIsPriceManuallyEdited(true);
    setDraft((prev) => ({ ...prev, price: capped }));
  };

  const handleTransactionSubmit = async () => {
    const validationErrors = validateDraft(draft);
    setDraftErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const isTransfer = isTransferType(draft.asset);
    const finalPrice = isTransfer ? 0 : Number(draft.price);
    const finalEurAmount = isTransfer ? 0 : Number(draft.eurAmount);

    const payload = {
      portfolios_id: selectedPortfolioId ?? undefined,
      asset: draft.asset.trim(),
      amount: Number(draft.amount),
      eur_amount: finalEurAmount,
      price: finalPrice,
      date: draft.date
    };

    if (transactionMode === 'create') {
      const ok = await onCreateInvestment(payload);
      if (ok) closeTransactionModal();
      return;
    }

    if (!editingInvestmentId) return;
    const ok = await onUpdateInvestment(editingInvestmentId, payload);
    if (ok) closeTransactionModal();
  };

  const handleDeleteFromModal = async () => {
    if (!editingInvestmentId || !selectedPortfolioId) return;
    const confirmed = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmed) return;

    const ok = await onDeleteInvestment(editingInvestmentId, selectedPortfolioId);
    if (ok) closeTransactionModal();
  };

  const handleDeleteFromRow = async (row: InvestmentRow) => {
    const confirmed = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmed) return;
    await onDeleteInvestment(row.id, row.portfolioId);
  };

  const handleCreatePortfolio = async () => {
    const ok = await onCreatePortfolio(newPortfolioName);
    if (ok) {
      setNewPortfolioName('');
      setExpandedPortfolioSection(null);
    }
  };

  const handleRenamePortfolio = async () => {
    if (!managerPortfolioId) return;
    const ok = await onRenamePortfolio(managerPortfolioId, renamePortfolioName);
    if (ok) {
      setExpandedPortfolioSection(null);
    }
  };

  const handleDeletePortfolio = async () => {
    if (!managerPortfolioId) return;
    const targetName = selectedManagerPortfolio?.name ?? 'this portfolio';
    const confirmed = window.confirm(`Are you sure you want to delete ${targetName}?`);
    if (!confirmed) return;

    const ok = await onDeletePortfolio(managerPortfolioId);
    if (ok && portfolios.length <= 1) {
      setIsPortfolioManagerOpen(false);
    }
  };

  useEffect(() => {
    if (!isPortfolioManagerOpen) return;
    const handleClickOutside = (event: Event) => {
      if (!portfolioMenuRef.current) return;
      if (!portfolioMenuRef.current.contains(event.target as Node)) {
        setIsPortfolioManagerOpen(false);
        setExpandedPortfolioSection(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isPortfolioManagerOpen]);

  const renderTableBody = () => {
    if (loading) {
      return <div className="loading">Loading your investments...</div>;
    }

    if (error) {
      return <p className="error centered-text">{error}</p>;
    }

    if (!portfolios.length) {
      return <p className="muted centered-text">No portfolios available</p>;
    }

    if (!rows.length) {
      return <p className="muted centered-text">No investments yet.</p>;
    }

    return (
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th className="col-date">Date</th>
              <th className="col-type">Type</th>
              <th className="col-btc">BTC Amount</th>
              <th className="col-eur">€ Amount</th>
              <th className="col-flow">Invested/Divested</th>
              <th className="col-invested">Invested</th>
              <th className="col-price">Price</th>
              <th className="col-divested">Divested</th>
              <th className="col-profit">Profit/Loss</th>
              <th className="col-notes">Notes</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const profitSign = row.profitLoss !== null && row.profitLoss >= 0 ? '+' : '';
              return (
                <tr key={row.id} className="investment-row" onClick={() => openEditTransactionModal(row.id)}>
                  <td className="col-date">{row.date}</td>
                  <td className="col-type">{row.type}</td>
                  <td className="col-btc">{`${formatBtc(row.btcAmount)} BTC`}</td>
                  <td className="col-eur">
                    {row.invested > 0 ? formatMoneyOrHyphen(row.invested) : formatMoneyOrHyphen(row.divested)}
                  </td>
                  <td className="col-flow">
                    {row.invested > 0 ? formatMoneyOrHyphen(row.invested) : formatMoneyOrHyphen(row.divested)}
                  </td>
                  <td className="col-invested">{formatMoneyOrHyphen(row.invested)}</td>
                  <td className="col-price">{formatMoneyOrHyphenNullable(row.price)}</td>
                  <td className="col-divested">{formatMoneyOrHyphen(row.divested)}</td>
                  <td className={`col-profit ${row.profitLoss === null ? '' : row.profitLoss >= 0 ? 'positive' : 'negative'}`}>
                    {row.profitLoss === null ? '-' : `${profitSign}${formatMoneyRounded(row.profitLoss)} ${EUR}`}
                  </td>
                  <td className="col-notes">{row.notes}</td>
                  <td className="col-actions">
                    <div className="table-actions">
                      <button
                        type="button"
                        className="icon-action icon-edit"
                        onClick={(event) => {
                          event.stopPropagation();
                          openEditTransactionModal(row.id);
                        }}
                        title="Edit transaction"
                        aria-label="Edit transaction"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                          <path
                            d="M4 20h4l10-10-4-4L4 16v4Zm13.7-11.3 1.6-1.6a1 1 0 0 0 0-1.4l-1.9-1.9a1 1 0 0 0-1.4 0l-1.6 1.6 3.3 3.3Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="icon-action icon-delete"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteFromRow(row);
                        }}
                        disabled={deletingInvestment.loading}
                        title="Delete transaction"
                        aria-label="Delete transaction"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                          <path
                            d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 7h2v8h-2v-8Zm4 0h2v8h-2v-8ZM7 10h2v8H7v-8Zm-1 10h12l-1 1H7l-1-1Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="investments-shell">
      <div className="investments-table">
        <div className="investments-header">
          <div className="portfolio-title">
            <h2>{selectedPortfolioName ?? 'Portfolio'}</h2>
            <div className="portfolio-select-trigger">
              <button
                type="button"
                className="portfolio-select-arrow"
                aria-label="Select portfolio"
                disabled={loading || !portfolios.length}
              >
                ▼
              </button>
              <select
                id="portfolio-selector"
                className="portfolio-selector"
                value={selectedPortfolioId ?? ''}
                onChange={(event) => onSelectPortfolio(event.target.value)}
                disabled={loading || !portfolios.length}
                aria-label="Select portfolio"
              >
                {portfolios.map((portfolio) => (
                  <option key={portfolio.portfolios_id} value={portfolio.portfolios_id}>
                    {portfolio.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="portfolio-controls">
            <button
              type="button"
              className="btn-inline portfolio-add-btn"
              onClick={openCreateTransactionModal}
              disabled={!selectedPortfolioId}
            >
              Add Transaction
            </button>
            <div className="portfolio-menu" ref={portfolioMenuRef}>
              <button
                type="button"
                className="btn-inline btn-secondary portfolio-manage-btn"
                onClick={() => {
                  setIsPortfolioManagerOpen((previous) => !previous);
                  setExpandedPortfolioSection(null);
                }}
                disabled={!portfolios.length}
                aria-label="Manage portfolios"
                title="Manage portfolios"
                aria-expanded={isPortfolioManagerOpen}
                aria-haspopup="true"
              >
                &#8942;
              </button>
              <div className={`portfolio-menu-dropdown ${isPortfolioManagerOpen ? 'open' : ''}`} aria-hidden={!isPortfolioManagerOpen}>
                <button
                  type="button"
                  className="portfolio-menu-item"
                  onClick={() =>
                    setExpandedPortfolioSection((previous) => (previous === 'rename' ? null : 'rename'))
                  }
                >
                  Rename portfolio
                </button>
                {expandedPortfolioSection === 'rename' ? (
                  <div className="portfolio-menu-panel">
                    <input
                      id="rename-portfolio"
                      value={renamePortfolioName}
                      onChange={(event) => setRenamePortfolioName(event.target.value)}
                      placeholder="New name"
                      disabled={!selectedManagerPortfolio}
                    />
                    <div className="portfolio-menu-actions">
                      <button
                        type="button"
                        onClick={handleRenamePortfolio}
                        disabled={!selectedManagerPortfolio || renamingPortfolio.loading || creatingPortfolio.loading}
                      >
                        {renamingPortfolio.loading ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                    {renamingPortfolio.error ? <p className="field-error">{renamingPortfolio.error}</p> : null}
                    {renamingPortfolio.success ? <p className="info-msg">Portfolio renamed.</p> : null}
                  </div>
                ) : null}
                <button
                  type="button"
                  className="portfolio-menu-item"
                  onClick={() =>
                    setExpandedPortfolioSection((previous) => (previous === 'create' ? null : 'create'))
                  }
                >
                  Create portfolio
                </button>
                {expandedPortfolioSection === 'create' ? (
                  <div className="portfolio-menu-panel">
                    <input
                      id="new-portfolio"
                      value={newPortfolioName}
                      onChange={(event) => setNewPortfolioName(event.target.value)}
                      placeholder="Portfolio name"
                    />
                    <div className="portfolio-menu-actions">
                      <button
                        type="button"
                        onClick={handleCreatePortfolio}
                        disabled={creatingPortfolio.loading || deletingPortfolio.loading || renamingPortfolio.loading}
                      >
                        {creatingPortfolio.loading ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                    {creatingPortfolio.error ? <p className="field-error">{creatingPortfolio.error}</p> : null}
                    {creatingPortfolio.success ? <p className="info-msg">Portfolio created.</p> : null}
                  </div>
                ) : null}
                <button
                  type="button"
                  className="portfolio-menu-item danger"
                  onClick={handleDeletePortfolio}
                  disabled={!selectedManagerPortfolio || deletingPortfolio.loading}
                >
                  {deletingPortfolio.loading ? 'Deleting...' : 'Delete portfolio'}
                </button>
                {deletingPortfolio.error ? <p className="field-error">{deletingPortfolio.error}</p> : null}
              </div>
            </div>
          </div>
        </div>

        {renderTableBody()}
      </div>

      {isTransactionModalOpen ? (
        <div className="modal-overlay open" onClick={(event) => event.currentTarget === event.target && closeTransactionModal()}>
          <div className="modal">
            <h3>{transactionMode === 'create' ? 'Create Transaction' : 'Edit Transaction'}</h3>
            <div className="form-group">
              <label htmlFor="asset">Type</label>
              <select
                id="asset"
                value={draft.asset}
                onChange={(event) => {
                  const nextType = normalizeTransactionType(event.target.value);
                  if (isTransferType(nextType)) {
                    setDraft((prev) => ({
                      ...prev,
                      asset: nextType,
                      eurAmount: '0',
                      price: currentBtcPrice ? String(currentBtcPrice.toFixed(2)) : prev.price
                    }));
                    setIsPriceManuallyEdited(false);
                    return;
                  }

                  setDraft((prev) => ({
                    ...prev,
                    asset: nextType,
                    eurAmount: prev.eurAmount === '0' ? '' : prev.eurAmount
                  }));
                  setIsPriceManuallyEdited(false);
                }}
              >
                {TRANSACTION_TYPES.map((transactionType) => (
                  <option key={transactionType} value={transactionType}>
                    {transactionType}
                  </option>
                ))}
              </select>
              {draftErrors.asset ? <p className="field-error">{draftErrors.asset}</p> : null}
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount (BTC)</label>
              <input
                id="amount"
                type="number"
                min="0"
                step="any"
                value={draft.amount}
                onChange={(event) => handleAmountChange(event.target.value)}
              />
              {draftErrors.amount ? <p className="field-error">{draftErrors.amount}</p> : null}
            </div>
            {showEurAmount ? (
              <div className="form-group">
                <label htmlFor="eur-amount">{eurAmountLabel(draft.asset)}</label>
                <input
                  id="eur-amount"
                  type="number"
                  min="0"
                  step="any"
                  value={draft.eurAmount}
                  onChange={(event) => handleEurAmountChange(event.target.value)}
                />
                {draftErrors.eurAmount ? <p className="field-error">{draftErrors.eurAmount}</p> : null}
              </div>
            ) : null}
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                min="0"
                step="any"
                value={draft.price}
                onChange={(event) => handlePriceChange(event.target.value)}
              />
              {draftErrors.price ? <p className="field-error">{draftErrors.price}</p> : null}
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={draft.date}
                onChange={(event) => setDraft((prev) => ({ ...prev, date: event.target.value }))}
              />
              {draftErrors.date ? <p className="field-error">{draftErrors.date}</p> : null}
            </div>
            {transactionMode === 'create' && creatingInvestment.error ? (
              <div className="error">{creatingInvestment.error}</div>
            ) : null}
            {transactionMode === 'edit' && updatingInvestment.error ? (
              <div className="error">{updatingInvestment.error}</div>
            ) : null}
            {deletingInvestment.error ? <div className="error">{deletingInvestment.error}</div> : null}
            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={closeTransactionModal}
                disabled={creatingInvestment.loading || updatingInvestment.loading || deletingInvestment.loading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleTransactionSubmit}
                disabled={creatingInvestment.loading || updatingInvestment.loading || deletingInvestment.loading}
              >
                {creatingInvestment.loading || updatingInvestment.loading ? 'Saving...' : 'Save'}
              </button>
            </div>
            {transactionMode === 'edit' ? (
              <div className="modal-actions modal-actions-delete">
                <button
                  type="button"
                  className="btn-danger"
                  onClick={handleDeleteFromModal}
                  disabled={creatingInvestment.loading || updatingInvestment.loading || deletingInvestment.loading}
                >
                  {deletingInvestment.loading ? 'Deleting...' : 'Delete Transaction'}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

    </section>
  );
}
