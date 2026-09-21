import { useState, useEffect, useRef, useLayoutEffect, useCallback, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Palette, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Define',
    description:
      'We work out what actually needs to exist — the real problem, who has it, and what the smallest useful version looks like. Half this step is cutting scope.',
  },
  {
    icon: Palette,
    title: 'Design',
    description:
      'Interface, identity and flow, drafted as something you can click rather than something you have to imagine. Decisions get made here, not during the build.',
  },
  {
    icon: Code2,
    title: 'Build',
    description:
      'Clean, typed, scalable code. We build in the open with working deploys from week one, so you are never waiting on a reveal to find out where it stands.',
  },
  {
    icon: Rocket,
    title: 'Ship & Iterate',
    description:
      'We launch, watch how it is actually used, and keep sharpening it. Shipping is the middle of the process, not the end of it.',
  },
];

const AUTO_PLAY_INTERVAL = 5000;

// --- Slide animation variants ---
const slideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '-50%' : '50%',
    opacity: 0,
  }),
};

// --- Main component ---
export default function Process() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSteps = steps.length;

  const goTo = useCallback(
    (step: number) => {
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
    },
    [currentStep],
  );

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentStep((s) => (s < totalSteps ? s + 1 : 1));
  }, [totalSteps]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(handleNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, handleNext]);

  const pauseAutoPlay = useCallback(() => setIsPaused(true), []);

  const activeStep = steps[currentStep - 1];
  const Icon = activeStep.icon;

  return (
    <section id="process" className="relative min-h-screen py-32 px-6 bg-paper">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-clean tracking-tighter text-ink mb-6">
            How We Build
          </h2>
          <p className="text-xl text-ink/70 max-w-2xl mx-auto font-sketch">
            The same four steps, whether it's ours or yours
          </p>
        </motion.div>

        {/* Stepper Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="stepper-card"
          onMouseEnter={pauseAutoPlay}
          onTouchStart={pauseAutoPlay}
        >
          {/* Step Indicators */}
          <div className="stepper-indicator-row">
            {steps.map((_, index) => {
              const stepNum = index + 1;
              return (
                <Fragment key={stepNum}>
                  <StepIndicator
                    step={stepNum}
                    currentStep={currentStep}
                    onClick={() => {
                      pauseAutoPlay();
                      goTo(stepNum);
                    }}
                  />
                  {index < totalSteps - 1 && (
                    <StepConnector isComplete={currentStep > stepNum} />
                  )}
                </Fragment>
              );
            })}
          </div>

          {/* Step Content */}
          <StepContentWrapper currentStep={currentStep} direction={direction}>
            <div className="stepper-step-body">
              <motion.div
                key={`icon-${currentStep}`}
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="stepper-step-icon"
              >
                <Icon className="w-10 h-10 text-ink" strokeWidth={1.5} />
              </motion.div>

              <h3 className="text-3xl font-bold text-ink tracking-tighter font-sketch mb-3">
                {activeStep.title}
              </h3>
              <p className="text-ink/70 leading-relaxed max-w-md mx-auto">
                {activeStep.description}
              </p>
            </div>
          </StepContentWrapper>

          {/* Navigation */}
          <div className="stepper-footer">
            <div
              className={`stepper-nav ${currentStep > 1 ? 'spread' : 'end'}`}
            >
              {currentStep > 1 && (
                <button
                  onClick={() => {
                    pauseAutoPlay();
                    handleBack();
                  }}
                  className="stepper-back-btn"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={() => {
                  pauseAutoPlay();
                  if (currentStep < totalSteps) {
                    handleNext();
                  } else {
                    goTo(1);
                  }
                }}
                className="stepper-next-btn"
              >
                {currentStep < totalSteps ? 'Continue →' : 'Start Over ↻'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Step Content Wrapper (handles animated height + slide) ---
function StepContentWrapper({
  currentStep,
  direction,
  children,
}: {
  currentStep: number;
  direction: number;
  children: React.ReactNode;
}) {
  const [height, setHeight] = useState(0);

  return (
    <motion.div
      className="stepper-content-wrapper"
      animate={{ height: height || 'auto' }}
      transition={{ type: 'spring', duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        <SlideTransition
          key={currentStep}
          direction={direction}
          onHeightReady={setHeight}
        >
          {children}
        </SlideTransition>
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: {
  children: React.ReactNode;
  direction: number;
  onHeightReady: (h: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) onHeightReady(ref.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={ref}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

// --- Step Indicator (pill circle) ---
function StepIndicator({
  step,
  currentStep,
  onClick,
}: {
  step: number;
  currentStep: number;
  onClick: () => void;
}) {
  const status =
    currentStep === step
      ? 'active'
      : currentStep > step
        ? 'complete'
        : 'inactive';

  return (
    <motion.div
      onClick={onClick}
      className="stepper-indicator"
      animate={status}
      initial={false}
    >
      <motion.div
        className="stepper-indicator-inner"
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: 'var(--bg-paper)',
            color: 'var(--ink-light)',
            border: '2px solid var(--sketch-gray)',
          },
          active: {
            scale: 1.1,
            backgroundColor: 'var(--ink-black)',
            color: 'var(--bg-paper)',
            border: '2px solid var(--ink-black)',
          },
          complete: {
            scale: 1,
            backgroundColor: 'var(--ink-black)',
            color: 'var(--bg-paper)',
            border: '2px solid var(--ink-black)',
          },
        }}
        transition={{ duration: 0.3 }}
      >
        {status === 'complete' ? (
          <CheckIcon />
        ) : status === 'active' ? (
          <motion.div
            className="stepper-active-dot"
            layoutId="activeDot"
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        ) : (
          <span className="stepper-step-number">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

// --- Step Connector (animated line) ---
function StepConnector({ isComplete }: { isComplete: boolean }) {
  return (
    <div className="stepper-connector">
      <motion.div
        className="stepper-connector-fill"
        initial={false}
        animate={{
          width: isComplete ? '100%' : '0%',
          backgroundColor: isComplete ? 'var(--ink-black)' : 'transparent',
        }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

// --- Animated checkmark ---
function CheckIcon() {
  return (
    <svg
      className="stepper-check-icon"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
