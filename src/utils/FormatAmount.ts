
export const formatAmount = (value: string) => {
    if (!value) return '';
  
    // Remove all non-numeric characters except for a single dot
    const cleaned = value.replace(/[^\d.]/g, '');
  
    // Split integer and decimal parts
    const [intPart, decimalPart] = cleaned.split('.');
  
    // Format integer part with commas
    const formattedInt = parseInt(intPart || '0', 10)
      .toLocaleString('en-US')
      .replace(/\.00$/, '');
  
    // Re-attach decimal (max 2 digits)
    if (decimalPart !== undefined) {
      return `${formattedInt}.${decimalPart.slice(0, 2)}`;
    }
  
    return formattedInt;
  };