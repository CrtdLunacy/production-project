import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReducersList, useDynamicModuleLoad } from '@/shared/lib/hooks/useDynamicModuleLoad/useDynamicModuleLoad';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    Text, TextAlign, TextSize, TextTheme,
} from '@/shared/ui/Text';
import { SkeletonLoader } from '@/shared/ui/SkeletonLoader';
import { Avatar } from '@/shared/ui/Avatar';
import EyeIcon from '@/shared/assets/icons/eyesight.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon } from '@/shared/ui/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import ArticleTextBlockComponent
    from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import ArticleImageBlockComponent
    from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import ArticleCodeBlockComponent
    from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleBlock } from '../../model/types/article';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import styles from './ArticleDetails.module.scss';
import { ArticleBlockType } from '../../model/const/const';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const initialReducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

const renderBlock = (block: ArticleBlock) => {
    switch (block.type) {
    case ArticleBlockType.CODE:
        return <ArticleCodeBlockComponent className={styles.block} block={block} key={block.id} />;
    case ArticleBlockType.IMAGE:
        return <ArticleImageBlockComponent className={styles.block} block={block} key={block.id} />;
    case ArticleBlockType.TEXT:
        return <ArticleTextBlockComponent className={styles.block} block={block} key={block.id} />;
    default:
        return null;
    }
};

export const ArticleDetails = memo(({ className, id }: ArticleDetailsProps) => {
    const dynamicModule = useDynamicModuleLoad({
        reducers: initialReducers,
    });
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const data = useSelector(getArticleDetailsData);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <SkeletonLoader className={styles.avatar} width={200} height={200} border="50%" />
                <SkeletonLoader className={styles.title} width={340} height={32} />
                <SkeletonLoader className={styles.skeleton} width={600} height={24} />
                <SkeletonLoader className={styles.skeleton} width="100%" height={200} />
                <SkeletonLoader className={styles.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <Text
                theme={TextTheme.ERROR}
                text={error}
                align={TextAlign.CENTER}
            />
        );
    } else {
        content = (
            <>
                <HStack max justify="center">
                    <Avatar
                        size={200}
                        src={data?.img}
                        className={styles.avatar}
                    />
                </HStack>
                <Text
                    theme={TextTheme.PRIMARY}
                    title={data?.title}
                    text={data?.subtitle}
                    size={TextSize.L}
                    className={styles.title}
                />
                <HStack gap="10">
                    <Icon Svg={EyeIcon} />
                    <Text text={String(data?.views)} />
                </HStack>
                <HStack gap="10">
                    <Icon Svg={CalendarIcon} />
                    <Text text={data?.createdAt} />
                </HStack>
                {data?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <VStack max gap="16" className={classNames(styles.ArticleDetails, {}, [className])}>
            {content}
        </VStack>
    );
});
