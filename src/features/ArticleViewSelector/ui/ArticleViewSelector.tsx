import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleView } from 'enteties/Article';
import ListIcon from 'shared/assets/icons/list.svg';
import GridIcon from 'shared/assets/icons/grid.svg';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon/Icon';
import { memo } from 'react';
import styles from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;
    const { t } = useTranslation();

    const viewTypes = [
        {
            view: ArticleView.GRID,
            icon: GridIcon,
        },
        {
            view: ArticleView.LIST,
            icon: ListIcon,
        },
    ];

    const handleClick = (newView: ArticleView) => () => onViewClick?.(newView);

    return (
        <div className={classNames(styles.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={handleClick(viewType.view)}
                    key={viewType.view}
                >
                    <Icon
                        className={classNames('', { [styles.selected]: viewType.view === view }, [])}
                        Svg={viewType.icon}
                    />
                </Button>
            ))}
        </div>
    );
});
