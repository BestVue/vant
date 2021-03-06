import Rate from '..';
import { mount, triggerDrag } from '../../../test/utils';

test('change event', () => {
  const onInput = jest.fn();
  const onChange = jest.fn();

  const wrapper = mount(Rate, {
    context: {
      on: {
        input: onInput,
        change: onChange
      }
    }
  });
  const item4 = wrapper.findAll('.van-rate__item').at(3);

  item4.trigger('click');
  expect(onInput.mock.calls[0][0]).toEqual(4);
  expect(onChange.mock.calls[0][0]).toEqual(4);
});

test('disabled', () => {
  const onInput = jest.fn();
  const onChange = jest.fn();

  const wrapper = mount(Rate, {
    propsData: {
      disabled: true
    },
    context: {
      on: {
        input: onInput,
        change: onChange
      }
    }
  });
  const item4 = wrapper.findAll('.van-rate__item').at(3);

  item4.trigger('click');
  expect(onInput.mock.calls.length).toEqual(0);
  expect(onChange.mock.calls.length).toEqual(0);
});

test('touchmove', () => {
  const onChange = jest.fn();
  const wrapper = mount(Rate, {
    context: {
      on: {
        change: onChange
      }
    }
  });
  triggerDrag(wrapper, 100, 0);

  const icons = wrapper.findAll('.van-icon');
  document.elementFromPoint = function (x) {
    const index = Math.round(x / 20);
    if (index < icons.length) {
      return icons.at(index).element;
    }
  };

  triggerDrag(wrapper, 100, 0);
  expect(onChange.mock.calls).toEqual([[2], [3], [4]]);
});
