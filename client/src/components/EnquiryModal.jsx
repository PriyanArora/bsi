import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { enquirySchema } from '../lib/enquirySchema'
import { CATEGORY_CATALOG, getProductsByCategory } from '../lib/productCatalog'

const PRODUCT_GROUPS = CATEGORY_CATALOG.map((category) => ({
  categoryName: category.categoryName,
  products: getProductsByCategory(category.categoryName),
}))

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function EnquiryModal({ isOpen, onClose, defaultProduct, source = 'website' }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      productOfInterest: defaultProduct || '',
      message: '',
      source,
    },
  })

  useEffect(() => {
    setValue('productOfInterest', defaultProduct || '')
  }, [defaultProduct, setValue])

  useEffect(() => {
    setValue('source', source)
  }, [source, setValue])

  useEffect(() => {
    if (!isOpen) {
      reset({
        fullName: '',
        companyName: '',
        phone: '',
        email: '',
        productOfInterest: defaultProduct || '',
        message: '',
        source,
      })
    }
  }, [isOpen, defaultProduct, source, reset])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to submit enquiry')
      }

      toast.success('Enquiry submitted successfully')
      reset({
        fullName: '',
        companyName: '',
        phone: '',
        email: '',
        productOfInterest: defaultProduct || '',
        message: '',
        source,
      })
      onClose()
    } catch (error) {
      toast.error(error.message || 'Unable to submit enquiry')
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-200 flex items-start justify-center overflow-y-auto bg-black/55 p-3 pt-24 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="border-bsi-outline/20 bg-bsi-surface-lowest max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border p-4 shadow-2xl sm:max-h-[92vh] sm:p-6 md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-bsi-accent text-xs font-bold uppercase tracking-[0.18em]">Quick Enquiry</p>
            <h2 className="font-headline text-bsi-primary mt-2 text-3xl font-extrabold">Tell us your requirement</h2>
            <p className="text-bsi-secondary mt-2 text-sm">Our technical team will get back to you shortly.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-bsi-secondary hover:text-bsi-primary rounded-full p-2 transition"
            aria-label="Close enquiry modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input type="hidden" {...register('source')} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-bsi-secondary mb-2 block text-xs font-bold uppercase tracking-[0.15em]">Full Name*</label>
              <input
                {...register('fullName')}
                placeholder="Your full name"
                className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary w-full rounded-lg border px-4 py-3 text-sm focus:border-bsi-primary focus:outline-none"
              />
              {errors.fullName ? <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p> : null}
            </div>

            <div>
              <label className="text-bsi-secondary mb-2 block text-xs font-bold uppercase tracking-[0.15em]">Company Name</label>
              <input
                {...register('companyName')}
                placeholder="Company"
                className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary w-full rounded-lg border px-4 py-3 text-sm focus:border-bsi-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-bsi-secondary mb-2 block text-xs font-bold uppercase tracking-[0.15em]">Phone*</label>
              <input
                {...register('phone')}
                placeholder="10-digit mobile number"
                className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary w-full rounded-lg border px-4 py-3 text-sm focus:border-bsi-primary focus:outline-none"
              />
              {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
            </div>

            <div>
              <label className="text-bsi-secondary mb-2 block text-xs font-bold uppercase tracking-[0.15em]">Email</label>
              <input
                {...register('email')}
                placeholder="name@company.com"
                className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary w-full rounded-lg border px-4 py-3 text-sm focus:border-bsi-primary focus:outline-none"
              />
              {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
            </div>
          </div>

          <div>
            <label className="text-bsi-secondary mb-2 block text-xs font-bold uppercase tracking-[0.15em]">Product of Interest</label>
            <select
              {...register('productOfInterest')}
              className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary w-full rounded-lg border px-4 py-3 text-sm focus:border-bsi-primary focus:outline-none"
            >
              <option value="">Select a product</option>
              {PRODUCT_GROUPS.map((group) => (
                <optgroup key={group.categoryName} label={group.categoryName}>
                  <option value={group.categoryName}>{group.categoryName} (Category)</option>
                  {group.products.map((product) => (
                    <option key={product.id} value={product.title}>
                      {product.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div>
            <label className="text-bsi-secondary mb-2 block text-xs font-bold uppercase tracking-[0.15em]">Message</label>
            <textarea
              {...register('message')}
              rows="3"
              placeholder="Share your lifting requirements"
              className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary w-full rounded-lg border px-4 py-3 text-sm focus:border-bsi-primary focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-bsi-primary-container w-full rounded-lg px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-bsi-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
          </button>
        </form>
      </div>
    </div>
  )
}
