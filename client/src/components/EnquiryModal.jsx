import { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPortal } from 'react-dom'
import { toast } from 'sonner'
import { enquirySchema } from '../lib/enquirySchema'
import { CATEGORY_CATALOG, getProductsByCategory } from '../lib/productCatalog'

const PRODUCT_GROUPS = CATEGORY_CATALOG.map((category) => ({
  categoryName: category.categoryName,
  products: [
    {
      id: `category-${category.slug}`,
      title: `${category.categoryName} (Category)`,
      value: category.categoryName,
    },
    ...getProductsByCategory(category.categoryName).map((product) => ({
      id: product.id,
      title: product.title,
      value: product.title,
    })),
  ],
}))

const SERVICE_OPTIONS = [{ id: 'service-amc-care', title: 'AMC Care', value: 'AMC Care' }]

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function EnquiryModal({ isOpen, onClose, defaultProduct, source = 'website' }) {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false)
  const [productMenuPosition, setProductMenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: 280,
  })

  const modalContentRef = useRef(null)
  const productMenuRef = useRef(null)
  const productTriggerRef = useRef(null)
  const productMenuListRef = useRef(null)
  const productMenuRafRef = useRef(0)

  const updateProductMenuPosition = useCallback(() => {
    const triggerElement = productTriggerRef.current
    if (!triggerElement) {
      return
    }

    const viewportPadding = 8
    const dropdownGap = 8
    const triggerRect = triggerElement.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    const spaceBelow = viewportHeight - triggerRect.bottom - viewportPadding - dropdownGap
    const spaceAbove = triggerRect.top - viewportPadding - dropdownGap
    const openAbove = spaceBelow < 220 && spaceAbove > spaceBelow
    const calculatedMaxHeight = Math.max(180, Math.min(360, openAbove ? spaceAbove : spaceBelow))
    const top = openAbove
      ? Math.max(viewportPadding, triggerRect.top - calculatedMaxHeight - dropdownGap)
      : Math.min(viewportHeight - viewportPadding - 180, triggerRect.bottom + dropdownGap)

    const width = Math.max(240, Math.min(triggerRect.width, viewportWidth - viewportPadding * 2))
    const left = Math.min(
      Math.max(viewportPadding, triggerRect.left),
      viewportWidth - viewportPadding - width
    )

    setProductMenuPosition({
      top,
      left,
      width,
      maxHeight: calculatedMaxHeight,
    })
  }, [])

  const {
    control,
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
      productOfInterest: defaultProduct ? [defaultProduct] : [],
      message: '',
      source,
    },
  })

  useEffect(() => {
    setValue('productOfInterest', defaultProduct ? [defaultProduct] : [])
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
        productOfInterest: defaultProduct ? [defaultProduct] : [],
        message: '',
        source,
      })
      setIsProductMenuOpen(false)
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

  useEffect(() => {
    if (!isProductMenuOpen) {
      return undefined
    }

    updateProductMenuPosition()

    const schedulePositionUpdate = () => {
      if (productMenuRafRef.current) {
        cancelAnimationFrame(productMenuRafRef.current)
      }

      productMenuRafRef.current = requestAnimationFrame(() => {
        updateProductMenuPosition()
      })
    }

    const handleOutsideClick = (event) => {
      const eventTarget = event.target
      const isInsideTrigger = productTriggerRef.current?.contains(eventTarget)
      const isInsideDropdown = productMenuListRef.current?.contains(eventTarget)

      if (!isInsideTrigger && !isInsideDropdown) {
        setIsProductMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsProductMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', schedulePositionUpdate)
    window.addEventListener('scroll', schedulePositionUpdate, true)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', schedulePositionUpdate)
      window.removeEventListener('scroll', schedulePositionUpdate, true)

      if (productMenuRafRef.current) {
        cancelAnimationFrame(productMenuRafRef.current)
        productMenuRafRef.current = 0
      }
    }
  }, [isProductMenuOpen, updateProductMenuPosition])

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      productOfInterest: (formData.productOfInterest || []).join(', '),
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
        productOfInterest: defaultProduct ? [defaultProduct] : [],
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
      className="fixed inset-0 z-200 flex items-start justify-center overflow-y-auto bg-black/55 p-3 pt-12 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        ref={modalContentRef}
        className="border-bsi-outline/20 bg-bsi-surface-lowest h-[88dvh] w-full max-w-2xl overflow-y-auto overscroll-contain touch-pan-y rounded-2xl border p-4 shadow-2xl sm:h-[95vh] sm:p-6 md:p-8"
        onScroll={() => {
          if (isProductMenuOpen) {
            updateProductMenuPosition()
          }
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-end">
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
            <Controller
              name="productOfInterest"
              control={control}
              render={({ field }) => {
                const selectedProducts = field.value || []

                const toggleProduct = (value) => {
                  if (selectedProducts.includes(value)) {
                    field.onChange(selectedProducts.filter((item) => item !== value))
                    return
                  }

                  field.onChange([...selectedProducts, value])
                }

                return (
                  <div className="relative" ref={productMenuRef}>
                    <button
                      ref={productTriggerRef}
                      type="button"
                      onClick={() => {
                        setIsProductMenuOpen((open) => {
                          const nextState = !open
                          if (nextState) {
                            requestAnimationFrame(() => updateProductMenuPosition())
                          }
                          return nextState
                        })
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setIsProductMenuOpen(true)
                          requestAnimationFrame(() => updateProductMenuPosition())
                        }

                        if (event.key === 'Escape') {
                          setIsProductMenuOpen(false)
                        }
                      }}
                      aria-haspopup="listbox"
                      aria-expanded={isProductMenuOpen}
                      aria-controls="product-interest-options"
                      className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm focus:border-bsi-primary focus:outline-none"
                    >
                      <span>
                        {selectedProducts.length > 0
                          ? `${selectedProducts.length} option${selectedProducts.length > 1 ? 's' : ''} selected`
                          : 'Select one or more products'}
                      </span>
                      <span className="text-bsi-secondary text-xs">▼</span>
                    </button>

                    <div className="mt-2 min-h-8 max-h-16 overflow-y-auto pr-1">
                      <div className="flex flex-wrap gap-2">
                        {selectedProducts.map((item) => (
                          <span
                            key={item}
                            className="bg-bsi-primary-container/10 text-bsi-primary inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {isProductMenuOpen && typeof document !== 'undefined'
                      ? createPortal(
                        <div
                          id="product-interest-options"
                          ref={productMenuListRef}
                          role="listbox"
                          aria-multiselectable="true"
                          className="border-bsi-outline/30 bg-bsi-surface-lowest fixed z-260 overflow-y-auto overscroll-contain touch-pan-y rounded-lg border p-2 shadow-xl"
                          style={{
                            top: `${productMenuPosition.top}px`,
                            left: `${productMenuPosition.left}px`,
                            width: `${productMenuPosition.width}px`,
                            maxHeight: `${productMenuPosition.maxHeight}px`,
                          }}
                          onWheel={(event) => event.stopPropagation()}
                          onTouchMove={(event) => event.stopPropagation()}
                        >
                          {PRODUCT_GROUPS.map((group) => (
                            <div key={group.categoryName} className="mb-2">
                              <p className="text-bsi-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em]">
                                {group.categoryName}
                              </p>
                              {group.products.map((product) => {
                                const isSelected = selectedProducts.includes(product.value)

                                return (
                                  <button
                                    key={product.id}
                                    role="option"
                                    aria-selected={isSelected}
                                    type="button"
                                    onClick={() => toggleProduct(product.value)}
                                    className="hover:bg-bsi-surface-low flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm"
                                  >
                                    <span
                                      className={[
                                        'flex h-4 w-4 items-center justify-center rounded border text-[10px]',
                                        isSelected
                                          ? 'border-bsi-primary bg-bsi-primary text-white'
                                          : 'border-bsi-outline/50 text-transparent',
                                      ].join(' ')}
                                    >
                                      ✓
                                    </span>
                                    <span className="text-bsi-primary">{product.title}</span>
                                  </button>
                                )
                              })}
                            </div>
                          ))}

                          <div className="border-bsi-outline/20 mt-2 border-t pt-2">
                            <p className="text-bsi-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em]">Services</p>
                            {SERVICE_OPTIONS.map((service) => {
                              const isSelected = selectedProducts.includes(service.value)

                              return (
                                <button
                                  key={service.id}
                                  role="option"
                                  aria-selected={isSelected}
                                  type="button"
                                  onClick={() => toggleProduct(service.value)}
                                  className="hover:bg-bsi-surface-low flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm"
                                >
                                  <span
                                    className={[
                                      'flex h-4 w-4 items-center justify-center rounded border text-[10px]',
                                      isSelected
                                        ? 'border-bsi-primary bg-bsi-primary text-white'
                                        : 'border-bsi-outline/50 text-transparent',
                                    ].join(' ')}
                                  >
                                    ✓
                                  </span>
                                  <span className="text-bsi-primary">{service.title}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>,
                        document.body,
                      )
                      : null}
                  </div>
                )
              }}
            />
            {errors.productOfInterest ? <p className="mt-1 text-xs text-red-600">{errors.productOfInterest.message}</p> : null}
          </div>

          <div>
            <label className="text-bsi-secondary mb-2 block text-xs font-bold uppercase tracking-[0.15em]">Message</label>
            <textarea
              {...register('message')}
              rows="3"
              placeholder="Share your lifting requirements"
              className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary h-28 w-full resize-none overflow-y-auto rounded-lg border px-4 py-3 text-sm focus:border-bsi-primary focus:outline-none"
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
