import { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPortal } from 'react-dom'
import { toast } from 'sonner'
import { enquirySchema } from '../lib/enquirySchema'
import { CATEGORY_CATALOG, JAKSON_CATEGORY_CATALOG, getProductsByCategory } from '../lib/productCatalog'

const buildProductGroups = (categories) =>
  categories.map((category) => ({
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

const PRODUCT_SECTIONS = [
  {
    id: 'indef',
    title: 'Indef Cranes and Hoists',
    groups: buildProductGroups(CATEGORY_CATALOG),
  },
  {
    id: 'jakson',
    title: 'Jakson Diesel generators',
    groups: buildProductGroups(JAKSON_CATEGORY_CATALOG),
  },
]

const SERVICE_OPTIONS = [{ id: 'service-amc-care', title: 'AMC Care', value: 'AMC Care' }]

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '')
const ENQUIRY_ENDPOINT = `${API_BASE_URL}/api/enquiry`

export default function EnquiryModal({ isOpen, onClose, defaultProduct, source = 'website' }) {
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false)
  const [modalScale, setModalScale] = useState(1)
  const [productMenuPosition, setProductMenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: 280,
  })

  const modalContentRef = useRef(null)
  const closeButtonRef = useRef(null)
  const previousActiveElementRef = useRef(null)
  const productMenuRef = useRef(null)
  const productTriggerRef = useRef(null)
  const productMenuListRef = useRef(null)
  const productMenuRafRef = useRef(0)

  const updateModalScale = useCallback(() => {
    const modalElement = modalContentRef.current
    if (!modalElement) {
      return
    }

    const viewportHeight = window.innerHeight
    const isLandscape = window.matchMedia('(orientation: landscape)').matches
    let edgePadding = window.innerWidth >= 768 ? 20 : 16

    if (isLandscape && viewportHeight < 600) {
      edgePadding = 12
    }

    const availableHeight = Math.max(320, viewportHeight - edgePadding * 2)
    const contentHeight = modalElement.offsetHeight

    if (!contentHeight) {
      setModalScale(1)
      return
    }

    const nextScale = Math.min(1, Math.max(0.72, availableHeight / contentHeight))
    setModalScale((prevScale) => (Math.abs(prevScale - nextScale) > 0.01 ? nextScale : prevScale))
  }, [])

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

    const width = Math.min(triggerRect.width, viewportWidth - viewportPadding * 2)
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
    watch,
    formState: { errors, isSubmitting, submitCount },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      phone: '',
      email: '',
      productOfInterest: defaultProduct ? [defaultProduct] : [],
      message: '',
      dataProtectionAccepted: false,
      source,
    },
  })

  const isConsentChecked = watch('dataProtectionAccepted')
  const showConsentError = Boolean(errors.dataProtectionAccepted) || (submitCount > 0 && !isConsentChecked)

  useEffect(() => {
    setValue('productOfInterest', defaultProduct ? [defaultProduct] : [])
  }, [defaultProduct, setValue])

  useEffect(() => {
    setValue('source', source)
  }, [source, setValue])

  useEffect(() => {
    if (!isOpen) {
      reset({
        firstName: '',
        lastName: '',
        companyName: '',
        phone: '',
        email: '',
        productOfInterest: defaultProduct ? [defaultProduct] : [],
        message: '',
        dataProtectionAccepted: false,
        source,
      })
      setIsProductMenuOpen(false)
    }
  }, [isOpen, defaultProduct, source, reset])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    previousActiveElementRef.current = document.activeElement

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
        return
      }

      if (event.key === 'Tab' && modalContentRef.current) {
        const focusableElements = modalContentRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )

        if (!focusableElements.length) {
          return
        }

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      previousActiveElementRef.current?.focus?.()
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      setModalScale(1)
      return undefined
    }

    updateModalScale()

    const handleViewportChange = () => {
      requestAnimationFrame(() => {
        updateModalScale()
      })
    }

    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('orientationchange', handleViewportChange)

    let resizeObserver
    if (typeof ResizeObserver !== 'undefined' && modalContentRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateModalScale()
      })
      resizeObserver.observe(modalContentRef.current)
    }

    return () => {
      window.removeEventListener('resize', handleViewportChange)
      window.removeEventListener('orientationchange', handleViewportChange)

      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [isOpen, updateModalScale])

  useEffect(() => {
    if (isProductMenuOpen) {
      updateProductMenuPosition()
    }
  }, [isProductMenuOpen, modalScale, updateProductMenuPosition])

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
    const fullName = `${formData.firstName} ${formData.lastName}`.trim()

    const requestPayload = {
      ...formData,
      fullName,
      productOfInterest: (formData.productOfInterest || []).join(', '),
    }

    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      })

      const responsePayload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(responsePayload.error || 'Failed to submit enquiry')
      }

      toast.success('Enquiry submitted successfully')
      reset({
        firstName: '',
        lastName: '',
        companyName: '',
        phone: '',
        email: '',
        productOfInterest: defaultProduct ? [defaultProduct] : [],
        message: '',
        dataProtectionAccepted: false,
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
      className="fixed inset-0 z-200 flex items-center justify-center overflow-hidden bg-black/55 p-4 sm:p-4 md:p-5"
      onClick={onClose}
    >
      <div
        ref={modalContentRef}
        className="border-bsi-outline/20 bg-bsi-surface-lowest w-full max-w-2xl rounded-2xl border p-4 shadow-2xl sm:p-5 md:p-6"
        style={{
          transform: `scale(${modalScale})`,
          transformOrigin: 'center center',
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
          <h2 className="font-headline text-bsi-primary text-xl font-extrabold sm:text-2xl">Tell Us Your Requirement</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="text-bsi-secondary hover:text-bsi-primary rounded-full p-2 transition"
            aria-label="Close enquiry modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 sm:space-y-5">
          <input type="hidden" {...register('source')} />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <div className="w-full min-w-0">
              <label htmlFor="firstName" className="text-bsi-secondary mb-1 block text-xs font-bold uppercase tracking-[0.15em]">First Name*</label>
              <input
                id="firstName"
                {...register('firstName')}
                aria-invalid={errors.firstName ? 'true' : 'false'}
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                placeholder="First name"
                className={[
                  'bg-bsi-surface-low text-bsi-primary w-full min-w-0 rounded-lg border px-3 py-2.5 text-sm focus:outline-none',
                  errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-bsi-outline/40 focus:border-bsi-primary'
                ].join(' ')}
              />
              {errors.firstName ? <p id="firstName-error" className="mt-1 text-xs text-red-600">{errors.firstName.message}</p> : null}
            </div>

            <div className="w-full min-w-0">
              <label htmlFor="lastName" className="text-bsi-secondary mb-1 block text-xs font-bold uppercase tracking-[0.15em]">Last Name*</label>
              <input
                id="lastName"
                {...register('lastName')}
                aria-invalid={errors.lastName ? 'true' : 'false'}
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                placeholder="Last name"
                className={[
                  'bg-bsi-surface-low text-bsi-primary w-full min-w-0 rounded-lg border px-3 py-2.5 text-sm focus:outline-none',
                  errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-bsi-outline/40 focus:border-bsi-primary'
                ].join(' ')}
              />
              {errors.lastName ? <p id="lastName-error" className="mt-1 text-xs text-red-600">{errors.lastName.message}</p> : null}
            </div>
          </div>

          <div className="w-full min-w-0">
            <label htmlFor="companyName" className="text-bsi-secondary mb-1 block text-xs font-bold uppercase tracking-[0.15em]">Company Name</label>
            <input
              id="companyName"
              {...register('companyName')}
              placeholder="Company"
              className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary w-full min-w-0 rounded-lg border px-3 py-2.5 text-sm focus:border-bsi-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <div className="w-full min-w-0">
              <label htmlFor="phone" className="text-bsi-secondary mb-1 block text-xs font-bold uppercase tracking-[0.15em]">Phone*</label>
              <input
                id="phone"
                {...register('phone')}
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                placeholder="10-digit mobile number"
                className={[
                  'bg-bsi-surface-low text-bsi-primary w-full min-w-0 rounded-lg border px-3 py-2.5 text-sm focus:outline-none',
                  errors.phone ? 'border-red-500 focus:border-red-500' : 'border-bsi-outline/40 focus:border-bsi-primary'
                ].join(' ')}
              />
              {errors.phone ? <p id="phone-error" className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
            </div>

            <div className="w-full min-w-0">
              <label htmlFor="email" className="text-bsi-secondary mb-1 block text-xs font-bold uppercase tracking-[0.15em]">Email</label>
              <input
                id="email"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                placeholder="name@company.com"
                className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary w-full min-w-0 rounded-lg border px-3 py-2.5 text-sm focus:border-bsi-primary focus:outline-none"
              />
              {errors.email ? <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
            </div>
          </div>

          <div className="w-full min-w-0">
            <label id="productOfInterest-label" className="text-bsi-secondary mb-1 block text-xs font-bold uppercase tracking-[0.15em]">Product of Interest</label>
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
                      aria-labelledby="productOfInterest-label"
                      className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary flex w-full min-w-0 items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm focus:border-bsi-primary focus:outline-none"
                    >
                      <span className="truncate pr-2">
                        {selectedProducts.length > 0
                          ? `${selectedProducts.length} option${selectedProducts.length > 1 ? 's' : ''} selected`
                          : 'Select one or more products'}
                      </span>
                      <span className="text-bsi-secondary text-xs">▼</span>
                    </button>

                    <div className="mt-2 min-h-8 pr-1">
                      <div className="flex flex-wrap gap-2">
                        {selectedProducts.map((item) => (
                          <span
                            key={item}
                            className="bg-bsi-primary-container/10 text-bsi-primary inline-flex max-w-full items-center rounded-full px-2 py-1 text-[11px] font-semibold"
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
                          {PRODUCT_SECTIONS.map((section, sectionIndex) => (
                            <div
                              key={section.id}
                              className={[
                                sectionIndex > 0 ? 'border-bsi-outline/20 mt-3 border-t pt-3' : '',
                              ].join(' ')}
                            >
                              <p className="font-headline text-bsi-primary px-2 py-1 text-xs font-extrabold uppercase tracking-[0.14em]">
                                {section.title}
                              </p>

                              {section.groups.map((group) => (
                                <div key={`${section.id}-${group.categoryName}`} className="mb-2">
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

          <div className="w-full min-w-0">
            <label htmlFor="message" className="text-bsi-secondary mb-1 block text-xs font-bold uppercase tracking-[0.15em]">Message</label>
            <textarea
              id="message"
              {...register('message')}
              aria-invalid={errors.message ? 'true' : 'false'}
              rows="3"
              placeholder="Share your requirements"
              className="border-bsi-outline/40 bg-bsi-surface-low text-bsi-primary min-h-28 w-full min-w-0 resize-none overflow-y-auto rounded-lg border px-3 py-2.5 text-sm focus:border-bsi-primary focus:outline-none"
            />
          </div>

          <div className="w-full min-w-0">
            <label htmlFor="dataProtectionAccepted" className="text-bsi-secondary flex w-full min-w-0 cursor-pointer items-start gap-2 text-xs leading-relaxed">
              <span className="relative mt-0.5 h-4 w-4 shrink-0">
                <input
                  id="dataProtectionAccepted"
                  type="checkbox"
                  {...register('dataProtectionAccepted')}
                  aria-invalid={showConsentError ? 'true' : 'false'}
                  className={[
                    'absolute inset-0 m-0 h-4 w-4 appearance-none rounded border bg-bsi-surface-low focus:ring-2 focus:ring-bsi-primary/35 focus:outline-none',
                    showConsentError ? 'border-red-500' : 'border-bsi-outline/50',
                    isConsentChecked ? 'border-bsi-primary bg-bsi-surface-low' : ''
                  ].join(' ')}
                />
                <span
                  aria-hidden="true"
                  className={[
                    'pointer-events-none absolute inset-0 flex items-center justify-center text-[10px] font-bold text-bsi-primary transition-opacity',
                    isConsentChecked ? 'opacity-100' : 'opacity-0'
                  ].join(' ')}
                >
                  ✓
                </span>
              </span>
              <span className="min-w-0 wrap-break-word">I have read and understood the relevant data protection notice.</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-bsi-primary-container w-full rounded-lg px-4 py-2.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-bsi-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
          </button>
        </form>
      </div>
    </div>
  )
}
