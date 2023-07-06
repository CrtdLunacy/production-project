import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import Text, { TextAlign } from '@/shared/ui/Text/Text';
import { ArticleImageBlock } from '../../model/types/article';
import styles from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(styles.ArticleImageBlockComponent, {}, [className])}>
            <img
                src={block.src}
                alt={block.title}
                className={styles.img}
            />
            {block.title && (
                <Text
                    text={block.title}
                    align={TextAlign.CENTER}
                />
            )}
        </div>
    );
});

export default ArticleImageBlockComponent;
