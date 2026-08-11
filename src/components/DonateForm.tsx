import { useState } from 'react'
import { useDemoForm } from '../hooks/useDemoForm'

type Frequency = 'onetime' | 'monthly'

interface DonateFormProps {
  amountChips: number[]
  defaultChip: number
}

const currency = new Intl.NumberFormat('en-IN')
const fmt = (n: number) => '₹' + currency.format(n)

export function DonateForm({ amountChips, defaultChip }: DonateFormProps) {
  const [freq, setFreq] = useState<Frequency>('onetime')
  const [chip, setChip] = useState<number | 'other'>(defaultChip)
  const [amount, setAmount] = useState<string>(String(defaultChip))
  const { sent, onSubmit } = useDemoForm(() => {
    setFreq('onetime')
    setChip(defaultChip)
    setAmount(String(defaultChip))
  })

  const selectChip = (value: number | 'other') => {
    setChip(value)
    setAmount(value === 'other' ? '' : String(value))
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="freq-toggle" role="group" aria-label="Donation frequency">
        <button
          type="button"
          className={freq === 'onetime' ? 'active' : undefined}
          onClick={() => setFreq('onetime')}
        >
          One-time
        </button>
        <button
          type="button"
          className={freq === 'monthly' ? 'active' : undefined}
          onClick={() => setFreq('monthly')}
        >
          Monthly
        </button>
      </div>
      <span className="field-legend">Choose an amount</span>
      <div className="amount-grid">
        {amountChips.map((a) => (
          <div
            key={a}
            className={`amount-chip${chip === a ? ' selected' : ''}`}
            onClick={() => selectChip(a)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                selectChip(a)
              }
            }}
          >
            {fmt(a)}
          </div>
        ))}
        <div
          className={`amount-chip${chip === 'other' ? ' selected' : ''}`}
          onClick={() => selectChip('other')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              selectChip('other')
            }
          }}
        >
          Other
        </div>
      </div>
      <div className="field">
        <label htmlFor="customAmount">Amount (₹)</label>
        <input
          id="customAmount"
          type="number"
          min={1}
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
            setChip('other')
          }}
        />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="d-name">Full name</label>
          <input id="d-name" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="d-email">Email</label>
          <input id="d-email" type="email" required />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn--primary btn--block"
        disabled={sent}
      >
        {sent ? 'Thank you ✓' : 'Continue to give'}
      </button>
      <p className="form-note">
        This is a demonstration form. Payment processing is not yet connected.
      </p>
    </form>
  )
}
