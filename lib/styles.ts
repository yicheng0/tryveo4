// Common utility classes for frequently used Tailwind combinations

export const styles = {
  // Layout utilities
  flexCenter: "flex items-center justify-center",
  flexCenterCol: "flex flex-col items-center justify-center",
  flexBetween: "flex items-center justify-between",
  textCenter: "text-center",
  
  // Card styles
  card: "bg-bgCard border border-borderSubtle rounded-lg shadow-sm",
  cardHover: "hover:shadow-md transition-shadow duration-200",
  
  // Button base styles
  buttonBase: "inline-flex items-center justify-center font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryBlue disabled:opacity-50 disabled:cursor-not-allowed",
  
  // Text styles
  textMain: "text-textMain",
  textSubtle: "text-textSubtle",
  textMuted: "text-gray-500 dark:text-gray-400",
  
  // Common transitions
  transition: "transition-all duration-200",
  transitionSlow: "transition-all duration-300",
  
  // Grid layouts
  gridResponsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  gridTwoCol: "grid grid-cols-1 md:grid-cols-2 gap-6",
  
  // Spacing utilities
  sectionPadding: "py-16 px-6 md:px-20",
  containerMax: "max-w-7xl mx-auto",
} as const;

// Utility function to combine classes (similar to cn but for our styles)
export function cls(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}