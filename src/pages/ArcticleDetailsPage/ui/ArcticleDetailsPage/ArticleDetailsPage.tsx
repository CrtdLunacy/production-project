import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReducersList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import PageLayout from '@/widgets/PageLayout/PageLayout';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '../../ui/ArticleDetailsComments/ArticleDetailsComments';
import ArticleDetailsPageHeader from '../ArcticleDetailsPageHeader/ArticleDetailsPageHeader';
import styles from './ArcticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleRating } from '@/features/ArticleRating';
import { NotFoundPage } from '@/pages/NotFoundPage';

interface ArticleDetailsPageProps {
  className?: string;
}
const initialReducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });
    const { id } = useParams<{id: string}>();

    if (!id) {
        return <NotFoundPage />;
    }

    return (
        <PageLayout className={classNames(styles.ArcticleDetailsPage, {}, [className])}>
            <VStack max gap="16">
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id!} />
                <ArticleRating articleId={id} />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id!} />
            </VStack>
        </PageLayout>
    );
};

export default memo(ArticleDetailsPage);
