import React from 'react';
import { Layer, Stage, Image, Group, Text } from 'react-konva';
import loadImages from '../../utils/loadImages';

class DragabbleAnimals extends React.Component {

    constructor() {
        super();

        this.state = {
            source: {},
            images: {
                snake: 'snake',
                giraffe: 'giraffe',
                monkey: 'monkey',
                lion: 'lion'
            },
            animals: {
                snake: {
                    x: 10,
                    y: 70,
                    inRightPlace: false,
                    draggable: true,
                },
                giraffe: {
                    x: 90,
                    y: 70,
                    inRightPlace: false,
                    draggable: true
                },
                monkey: {
                    x: 275,
                    y: 70,
                    inRightPlace: false,
                    draggable: true,
                },
                lion: {
                    x: 400,
                    y: 70,
                    inRightPlace: false,
                    draggable: true
                }
            },
            outlines: {
                snake_black: {
                    x: 275,
                    y: 350
                },
                giraffe_black: {
                    x: 390,
                    y: 250
                },
                monkey_black: {
                    x: 300,
                    y: 420
                },
                lion_black: {
                    x: 100,
                    y: 390
                }
            },
            score: 0,
            text: 'Ahoy! Put the animals on the beach!',
            assetsLoaded: false,
            canvasWidth: 0
        }
    }

    componentWillMount() {
        loadImages()
            .then(data => {
                this.setState({
                    source: data,
                    assetsLoaded: true
                })
            });
    }

    componentDidMount() {
        this.setState({
            canvasWidth: this.refs.canvasAnimal.props.width
        })
    }

    checkPosition = (key) => {
        let animalsFromState = Object.assign({}, this.state.animals);
        let score = this.state.score;
        let text = 'Ahoy! Put the animals on the beach!';

        if (this.state.animals[key].inRightPlace === false && this.isNearOutline(key)) {
            animalsFromState[key].x = this.state.outlines[`${key}_black`].x;
            animalsFromState[key].y = this.state.outlines[`${key}_black`].y;
            animalsFromState[key].inRightPlace = true;
            animalsFromState[key].draggable = false;
            score++;


            if (score >= 4) {
                text = 'You win! Enjoy your booty!';
            }
        }
        this.setState({
            animals: animalsFromState,
            score,
            text
        });
    }

    isNearOutline = (key) => {
        let a = this.state.animals[key];
        let o = this.state.outlines[`${key}_black`];

        if (a.x > o.x - 20 && a.x < o.x + 20 && a.y > o.y - 20 && a.y < o.y + 20) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Events
     **/
    handleMouseOver = (key) => {
        let imageFromState = {
            ...this.state.images,
            [key]: `${key}_glow`
        };

        this.setState({
            images: imageFromState
        });

        document.body.style.cursor = 'pointer';
    }

    handleMouseOut = (key) => {
        let imageFromState = {
            ...this.state.images,
            [key]: key
        };

        this.setState({
            images: imageFromState
        });

        document.body.style.cursor = 'default';
    }


    handleDragStart = (key) => {
        Object.keys(this.state.animals).map((k) => {
            if (key === k) {
                this.refs[k].setZIndex(25);
            } else {
                this.refs[k].setZIndex(1);
            }
        })
    }

    handleDragEnd = (key) => {
        let animalsState = Object.assign({}, this.state.animals);

        animalsState[key].x = this.refs[key].attrs.x;
        animalsState[key].y = this.refs[key].attrs.y;

        this.setState({
            animals: animalsState
        });

        this.checkPosition(key);
    }

    /**
     * Draw init objects
     **/
    createDraggableAnimals = () => {
        return Object.keys(this.state.images).map((key) => {
            let animal = this.state.animals[key];
            return (
                <Image
                    key={key}
                    ref={key}
                    image={this.state.source[this.state.images[key]]}
                    x={animal.x}
                    y={animal.y}
                    draggable={animal.draggable}
                    onMouseOver={() => this.handleMouseOver(key)}
                    onMouseOut={() => this.handleMouseOut(key)}
                    onDragEnd={() => this.handleDragEnd(key)}
                    onDragStart={() => this.handleDragStart(key)}
                    setZIndex="1"
                />
            )
        })
    }

    createShadowAnimals = () => {
        //  console.log(this.ref);

        return Object.keys(this.state.outlines).map((key) => {
            return (
                <Image key={key} image={this.state.source[key]} x={this.state.outlines[key].x} y={this.state.outlines[key].y} />
            )
        })
    }

    /**
     * Render
     **/

    render() {
        console.log(this.state);

        return (
            <Stage width={578} height={530} ref="canvasAnimal">
                {
                    this.state.assetsLoaded ? (
                        <Layer>
                            <Image image={this.state.source.beach} />
                            <Text
                                text={this.state.text}
                                x={0} y={40}
                                width={this.state.canvasWidth}
                                fontFamily="Calibri"
                                fontSize="30"
                                fill="white"
                                align="center"
                            />
                            <Group>{this.createShadowAnimals()}</Group>
                            <Group>{this.createDraggableAnimals()}</Group>
                        </Layer>
                    ) : null
                }
            </Stage>
        )
    }
}

export default DragabbleAnimals;
