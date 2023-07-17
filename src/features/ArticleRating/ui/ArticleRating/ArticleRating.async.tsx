import { FC, lazy, Suspense } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import SkeletonLoader from '@/shared/ui/SkeletonLoader/SkeletonLoader';

export const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
    <Suspense fallback={<SkeletonLoader width="100%" height={140} />}>
        <ArticleRatingLazy {...props} />
    </Suspense>
);
