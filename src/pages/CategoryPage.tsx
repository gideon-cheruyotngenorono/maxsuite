import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { allApps } from '../data';
import { AppCard } from '../components/AppCard';
import './CategoryPage.css';
import { BackButton } from '../components/BackButton';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const categoryApps = useMemo(() => {
    if (!categoryId) return [];
    if (categoryId === 'All') return allApps;
    return allApps.filter(app => app.category === categoryId);
  }, [categoryId]);

  if (!categoryId || categoryApps.length === 0) {
    return <div className="container py-20 text-center"><h2 className="text-secondary">Category Not Found</h2></div>;
  }

  // Get gradient color based on category
  const getGradient = (cat: string) => {
    if (cat.includes("Streaming")) return "rgba(139, 92, 246, 0.4)"; // Purple
    if (cat.includes("Social")) return "rgba(59, 130, 246, 0.4)"; // Blue
    if (cat.includes("Design")) return "rgba(236, 72, 153, 0.4)"; // Pink
    return "var(--primary-accent-glow)"; // Green for dev
  };

  return (
    <div className="category-page">
      <div className="container mt-6">
        <BackButton />
      </div>
      <div 
        className="category-header"
        style={{ '--cat-bg': getGradient(categoryId) } as React.CSSProperties}
      >
        <div className="container header-inner">
           <h1 className="category-title">{categoryId}</h1>
           <p className="category-subtitle">Explore our premium selection of verified {categoryId.toLowerCase()} tools.</p>
           <div className="badge-tag price-tag">{categoryApps.length} Tools Available</div>
        </div>
      </div>

      <div className="container category-content">
        <div className="apps-grid">
           {categoryApps.map(app => (
              <AppCard key={app.id} app={app} />
           ))}
        </div>
      </div>
    </div>
  );
};
