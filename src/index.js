import './style.css'
import Sortable from 'sortablejs';

var el = document.getElementById('qforms1');
var sortable = Sortable.create(el, {
    animation: 20000,

});
//
//
// sortable('.itClient', {
//     forcePlaceholderSize: true,
//
// });

const elements = document.querySelectorAll('.qformtab');

[...elements].forEach((tab) => {
    tab.addEventListener('click', () => {
        console.log("spread forEach worked");
    });
    tab.addEventListener('mousedown', (events) => {
        events.stopPropagation();
        const draggableItem = events.currentTarget;
        const parent = draggableItem.parentElement;


        const itemSize = draggableItem.getBoundingClientRect();
        const parentSize = parent.getBoundingClientRect();
        const emptyItem = document.createElement('div');
        emptyItem.style.width = `${itemSize.width}px`
        emptyItem.style.height = `${itemSize.height}px`

        draggableItem.style.position = 'absolute'
        draggableItem.style.width = `${itemSize.width}px`
        draggableItem.style.height = `${itemSize.height}px`
        draggableItem.style.left = `${itemSize.left - parentSize.left - 2}px`
        draggableItem.style.zIndex = '9999';

        draggableItem.after(emptyItem)

        const startTouchPosition = events.pageX - itemSize.left
        console.log(startTouchPosition)
        console.log(events.pageX, itemSize.left, parentSize.left)

        const mouseMovieEvent = (event) => {

            // console.log(event)
            const viewport_x = event.clientX;
            const nextSibling = draggableItem.nextElementSibling.nextElementSibling
            if (nextSibling) {
                const nextSiblingBound = nextSibling.getBoundingClientRect();

                const changePoint = parentSize.left + nextSiblingBound.left + nextSiblingBound.width / 2;
                if (viewport_x - startTouchPosition - 10 + itemSize.width > changePoint) {
                    console.log('change')
                    emptyItem.before(nextSibling)
                    // draggableItem.before(nextSibling)

                    emptyItem.style.transition = 'transform 2000ms ease 0s';


                    // console.log(emptyItem.style.transition)
                    nextSibling.style.transform = 'translate(0px, 0px)';
                    nextSibling.style.transition = 'transform 2000ms ease 0s';

                    // draggableItem.style.transition = 'transform 2000ms ease Os';
                    // "transform: translated (0 px, Opx, Opx); transition: transform 20000ms ease Os;"
                    // "transition: transform 20000ms ease 0s;"
                }
                draggableItem.style.left = `${viewport_x - startTouchPosition - 10}px`
            }

        }

        tab.addEventListener('mousemove', mouseMovieEvent)

        const mouseUpEvent = (event) => {
            console.log('up')
            emptyItem.remove()
            draggableItem.style.removeProperty('position')
            draggableItem.style.removeProperty('left')
            draggableItem.style.removeProperty('width')
            draggableItem.style.removeProperty('height')
            draggableItem.style.removeProperty('z-index')

            tab.removeEventListener('mousemove', mouseMovieEvent)
            tab.removeEventListener('mouseup', mouseUpEvent)

            document.body.removeEventListener('mousemove', mouseMovieEvent)
            document.body.removeEventListener('mouseup', mouseUpEvent)

        }
        //
        // tab.addEventListener('mouseleave', (e) => {
        //     mouseUpEvent(e)
        // })
        tab.addEventListener('mouseup', mouseUpEvent)

        document.body.addEventListener('mousemove', (e) => {
            console.log('eeee')
            mouseMovieEvent(e)
        })
        document.body.addEventListener('mouseup', mouseUpEvent)
    })
});