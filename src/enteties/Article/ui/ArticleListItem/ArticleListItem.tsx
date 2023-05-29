import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Text from 'shared/ui/Text/Text';
import Icon from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eyesight.svg';
import Card from 'shared/ui/Card/Card';
import Avatar from 'shared/ui/Avatar/Avatar';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import {
    HTMLAttributeAnchorTarget, memo, ReactNode, useCallback,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AppLink from 'shared/ui/AppLink/AppLink';
import App from 'app/App';
import ArticleTextBlockComponent from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import styles from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view,
        target,
    } = props;
    const { t } = useTranslation();

    const types = <Text text={article.type.join(', ')} className={styles.types} />;
    const views = (
        <>
            <Text text={String(article.views)} className={styles.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;

        return (
            <div className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}>
                <Card>
                    <div className={styles.header}>
                        <AppLink to={RoutePath.profile + article.user.id} className={styles.link}>
                            <Avatar size={30} src={article.user.avatar} alt={article.user.username} />
                            <Text text={article.user.username} className={styles.username} />
                        </AppLink>
                        <Text text={article.createdAt} className={styles.date} />
                    </div>
                    <Text text={article.title} className={styles.title} />
                    {types}
                    <img src={article.img} className={styles.img} alt={article.title} />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={styles.textBlock}
                        />
                    )}
                    <div className={styles.footer}>
                        <AppLink
                            target={target}
                            to={RoutePath.article_details + article.id}
                        >
                            <Button
                                theme={ButtonTheme.OUTLINE}
                            >
                                {t('Читать далее')}
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            target={target}
            to={RoutePath.article_details + article.id}
            className={classNames(styles.ArticleListItem, {}, [className, styles[view]])}
        >
            <Card className={styles.card}>
                <div className={styles.imgWrapper}>
                    <img
                        src={article.img}
                        alt={article.title}
                        className={styles.img}
                    />
                    <Text text={article.createdAt} className={styles.date} />
                </div>
                <div className={styles.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={styles.title} />
            </Card>
        </AppLink>
    );
});

export default ArticleListItem;
