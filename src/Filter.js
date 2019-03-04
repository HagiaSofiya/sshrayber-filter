import React from 'react';
import  StackGrid, { transitions, easings }from "react-stack-grid";

import screens from './data.json';


class Filter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            screens: screens,
            filteredScreens: screens
        }
    }

    compareBy(key){
        this.setState({
            filteredScreens: this.state.screens.filter(screen => {
                return screen.name === key ;
            })
        })
    }

    reset(){
        this.setState({
            filteredScreens: this.state.screens
        })
    }

    render(){
        const { filteredScreens, screens } = this.state
        const categories = [...new Set(screens.map(screen => screen.name))]

        const transition = transitions.scaleDown;
        
        return (
            <div className='container'>
                <div className='menu'>
                    <button
                        type="button"
                        onClick={() => this.reset()}
                        key="reset"
                    >
                        all
                    </button>
                    {categories.map(category => {
                        return (
                                <button
                                    type="button"
                                    onClick={() => this.compareBy(category)} key={category}>
                                    {category}
                                </button>
                            )
                    })}
                </div>
                <StackGrid
                    columnWidth={200}
                    className='grid'
                    gutterWidth={15}
                    gutterHeight={15}
                    duration={600}
                    easing={easings.cubicOut}
                    appearDelay={60}
                    appear={transition.appear}
                    appeared={transition.appeared}
                    enter={transition.enter}
                    entered={transition.entered}
                    leaved={transition.leaved}
                >
                    {filteredScreens.map((screens) => {
                        return (
                            <figure className="screen" key={screens.key}>
                                <img src={screens.url} alt={screens.name}/>
                                <figcaption className="screen-caption">{screens.name}</figcaption>
                            </figure>

                        )
                    })}
                </StackGrid>
            </div>
        )
    }
}

export default Filter;