'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function VisitorForm() {
  const [formData, setFormData] = useState({
    visitorName: '',
    visitorPhone: '',
    purpose: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Visitor Logged",
        description: `Visitor ${formData.visitorName} has been checked in successfully.`,
      });
      
      // Reset form
      setFormData({
        visitorName: '',
        visitorPhone: '',
        purpose: '',
        notes: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log visitor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="visitorName" className="block text-sm font-medium">
          Visitor Name
        </label>
        <Input
          id="visitorName"
          type="text"
          required
          value={formData.visitorName}
          onChange={(e) => setFormData({...formData, visitorName: e.target.value})}
          placeholder="Visitor's full name"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="visitorPhone" className="block text-sm font-medium">
          Phone Number
        </label>
        <Input
          id="visitorPhone"
          type="tel"
          required
          value={formData.visitorPhone}
          onChange={(e) => setFormData({...formData, visitorPhone: e.target.value})}
          placeholder="Visitor's phone number"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="purpose" className="block text-sm font-medium">
          Purpose of Visit
        </label>
        <Input
          id="purpose"
          type="text"
          required
          value={formData.purpose}
          onChange={(e) => setFormData({...formData, purpose: e.target.value})}
          placeholder="E.g., Meeting, Delivery, Visit"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="notes" className="block text-sm font-medium">
          Additional Notes
        </label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          placeholder="Any additional information about the visit..."
          className="min-h-[80px]"
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Logging Visitor...' : 'Log Visitor'}
      </Button>
    </form>
  );
}
